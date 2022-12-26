import {StorageCloudServiceClient} from "./message_grpc_pb";
import {ChannelCredentials} from "@grpc/grpc-js";
import {SpaceProxyServerInterface} from "./space.proxy.server.interfaces";
import {SpaceProxyError} from "./space.proxy.error";
import {DropReq, FetchConvertReq, FetchReq, FetchRes, HeadReq, PushReq, Metadata} from "./message_pb";
import {DropInput, DropOutput, FetchInput, HeadInput, HeadOutput, PushInput} from "./space.proxy.data";
import * as StreamPromises from "stream/promises";
import {Readable, Writable} from "stream";
import {SpaceProxyStream} from "./space.proxy.stream";

export class SpaceProxyServer implements SpaceProxyServerInterface {
    private readonly _host: string;
    private readonly _port: number;
    private readonly _insecure: boolean;
    private _selfDisconnect: boolean;

    private _client: StorageCloudServiceClient;

    constructor(host: string, port: number, insecure?: boolean) {
        this._host = host;
        this._port = port;
        this._selfDisconnect = false;
        this._insecure = insecure === undefined ? true : insecure;
    }

    connect(waitSeconds?: number): Promise<SpaceProxyServerInterface> {
        let ops;
        if (this._insecure) {
            ops = ChannelCredentials.createInsecure();
        } else {
            ops = ChannelCredentials.createSsl();
        }
        return new Promise<SpaceProxyServerInterface>((resolve, reject) => {
            this._client = new StorageCloudServiceClient(`${this._host}:${this._port}`, ops);
            const deadline = new Date();
            deadline.setSeconds(deadline.getSeconds() + (waitSeconds || 5));
            this._client.waitForReady(deadline, (err: Error) => {
                if (err) {
                    reject(new SpaceProxyError('ServiceUnavailable', err.message));
                    return;
                }
                resolve(this);
            });
        });
    }

    disconnect() {
        this._selfDisconnect = true;
        if (this._client) {
            this._client.close();
        }
    }

    getHead(input: HeadInput): Promise<HeadOutput> {
        const req = new HeadReq()
        req.setBucket(input.bucket);
        req.setKey(input.key);
        return new Promise((resolve, reject) => {
            this._client.head(req, (err, res) => {
                if (err) {
                    reject(SpaceProxyError.Resolve(err.message));
                    return;
                }
                const metadata: any = {};
                for (const [k, v] of res.getMetadataMap()) {
                    metadata[k] = v;
                }
                resolve({
                    key: res.getKey(),
                    size: res.getSize(),
                    contentType: res.getContenttype(),
                    metadata: metadata
                });
            });
        });
    }

    fetchConvert(input: FetchInput): SpaceProxyStream {
        const req = new FetchConvertReq();
        req.setKey(input.key);
        req.setBucket(input.bucket);
        req.setFormat(input.format);

        const client = this._client;
        let result: SpaceProxyStream;
        result = {
            async syncWrite(wr: Writable): Promise<void> {
                await StreamPromises.pipeline(result.getStream(), wr);
            },

            getStream(): Readable {
                const readable = new Readable({
                    read(size: number) {
                    }
                });
                const stream = client.fetchAndConvert(req);
                stream.on('data', (msg: FetchRes) => {
                    readable.push(msg.getData_asU8())
                });
                stream.on('error', (err: any) => {
                    if (err.code && err.code === 13) {
                        return;
                    }
                    readable.destroy(new SpaceProxyError('unknown', err.message));
                });
                stream.on('end', () => {
                    readable.push(null);
                });
                return readable;
            },

            getSyncBuffer(): Promise<Uint8Array> {
                return new Promise<Uint8Array>((resolve, reject) => {
                    let chunks = [];
                    const r = result.getStream();
                    r.once('error', (err) => {
                        console.error(err);
                        reject(err)
                    });
                    r.once('end', () => {
                        resolve(Buffer.concat(chunks))
                    });
                    r.on('data', (chunk) => {
                        chunks.push(chunk); // push data chunk to array
                    });
                })
            }
        };

        return result;
    }

    fetch(input: FetchInput): SpaceProxyStream {
        const req = new FetchReq();
        req.setKey(input.key);
        req.setBucket(input.bucket);

        const client = this._client;
        let result: SpaceProxyStream;
        result = {
            async syncWrite(wr: Writable): Promise<void> {
                await StreamPromises.pipeline(result.getStream(), wr);
            },

            getStream(): Readable {
                const readable = new Readable({
                    read(size: number) {
                    }
                });
                const stream = client.fetch(req);
                stream.on('data', (msg: FetchRes) => {
                    readable.push(msg.getData_asU8())
                });
                stream.on('error', (err: any) => {
                    if (err.code && err.code === 13) {
                        return;
                    }
                    readable.destroy(new SpaceProxyError('unknown', err.message));
                });
                stream.on('end', () => {
                    readable.push(null);
                });
                return readable;
            },

            getSyncBuffer(): Promise<Uint8Array> {
                return new Promise<Uint8Array>((resolve, reject) => {
                    let chunks = [];
                    const r = result.getStream();
                    r.once('error', (err) => {
                        console.error(err);
                        reject(err)
                    });
                    r.once('end', () => {
                        resolve(Buffer.concat(chunks))
                    });
                    r.on('data', (chunk) => {
                        chunks.push(chunk); // push data chunk to array
                    });
                })
            }
        };

        return result;
    }

    drop(input: DropInput): Promise<DropOutput> {
        const req = new DropReq()
        req.setBucket(input.bucket);
        req.setKey(input.key);
        req.setPrefixmatch(input.prefix);
        return new Promise((resolve, reject) => {
            this._client.drop(req, (err, res) => {
                if (err) {
                    reject(SpaceProxyError.Resolve(err.message));
                    return;
                }
                resolve({
                    key: res.getKey(),
                });
            });
        });
    }

    push(input: PushInput, readable: Readable): Promise<any> {
        const req = new PushReq();
        const md = new Metadata();
        md.setKey(input.key);
        md.setBucket(input.bucket);
        md.setContenttype(input.contentType);
        md.setConcurrent(input.concurrent);
        req.setMetadata(md);
        return new Promise<any>((resolve, reject) => {
            const stream = this._client.push((err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            })
            stream.write(req);
            readable.on('data', (msg: Buffer) => {
                let chunk = new PushReq();
                console.log('chunk size: ', msg.length );
                chunk.setChunk(msg);
                stream.write(chunk);
            });
            readable.on('error', (err: any) => {
                if (err.code && err.code === 13) {
                    return;
                }
                resolve(err);
            });
            readable.on('end', () => {
                stream.end();
            });
        });
    }
}