import {StorageCloudServiceClient} from "./message_grpc_pb";
import {ChannelCredentials} from "@grpc/grpc-js";
import {SpaceProxyServerInterface} from "./space.proxy.server.interfaces";
import {SpaceProxyError} from "./space.proxy.error";
import {CopyFromReq, DropReq, FetchConvertReq, FetchReq, FetchRes, HeadReq, Metadata, PushReq} from "./message_pb";
import {
    CopyInput,
    CopyOutput,
    DropInput,
    DropOutput,
    FetchInput,
    HeadInput,
    HeadOutput,
    PushInput,
    PushOutput
} from "./space.proxy.data";
import * as StreamPromises from "stream/promises";
import {Readable, Transform, Writable} from "stream";
import {BufferAsReadable, SpaceProxyStream} from "./space.proxy.stream";
import {ConnectivityState} from "@grpc/grpc-js/build/src/connectivity-state";

const DefaultChunkSize = 1024 * 1024 * 5; // 5MB

export class SpaceProxyServer implements SpaceProxyServerInterface {
    private readonly _host: string;
    private readonly _port: number;
    private readonly _insecure: boolean;
    private readonly _chunkSize: number;
    private _client: StorageCloudServiceClient;
    private _connect: boolean;
    private _syncStatusTimer: any;

    constructor(host: string, port: number, insecure?: boolean, chunkSize?: number) {
        this._host = host;
        this._port = port;
        this._insecure = insecure === undefined ? true : insecure;
        this._chunkSize = chunkSize === undefined ? DefaultChunkSize : chunkSize;
        this._connect = false;
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

                this.startSyncStatus();
                resolve(this);
            });
        });
    }

    isConnected(): boolean {
        return this._connect;
    }

    disconnect() {
        if (this._client) {
            this._client.close();
            this._client.getChannel().close();
        }
        this.stopSyncStatus();
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
                res.getMetadataMap().forEach((value, key) => {
                    metadata[key] = value;
                });

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
                        reject(new SpaceProxyError('unknown', err.message));
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
                        reject(new SpaceProxyError('unknown', err.message));
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
                    reject(new SpaceProxyError('unknown', err.message));
                    return;
                }
                resolve({
                    key: res.getKey(),
                });
            });
        });
    }

    push(input: PushInput, read: Readable | Buffer | Transform): Promise<PushOutput> {
        let readable: Readable;
        if (read instanceof Buffer) {
            readable = BufferAsReadable(read as Buffer);
        } else {
            readable = read as Readable;
        }

        const req = new PushReq();
        const md = new Metadata();
        const maxChunkSize = this._chunkSize;
        md.setKey(input.key);
        md.setBucket(input.bucket);
        md.setContenttype(input.contentType);
        md.setConcurrent(input.concurrent);
        md.setExpiresinseconds(input.expireInSeconds);
        md.setSize(input.length);
        md.setExtension$(input.extension);
        req.setMetadata(md);
        return new Promise<any>((resolve, reject) => {
            const stream = this._client.push((err, res) => {
                if (err) {
                    reject(new SpaceProxyError('unknown', err.message));
                    return;
                }
                resolve({
                    key: res.getName(),
                    size: res.getSize(),
                    hash: res.getHash()
                });
            })
            stream.write(req);
            let chunks: Buffer[] = [];
            let chunkSize: number = 0;
            readable.on('data', (msg: Buffer) => {
                chunks.push(msg);
                chunkSize += msg.length;
                if (chunkSize >= maxChunkSize) {
                    let chunk = new PushReq();
                    chunk.setChunk(Buffer.concat(chunks));
                    stream.write(chunk);
                    // clear to next chunk
                    chunks = [];
                    chunkSize = 0;
                }
            });
            readable.on('error', (err: any) => {
                if (err.code && err.code === 13) {
                    return;
                }
                stream.end();
                resolve(err);
            });
            readable.on('end', () => {
                if (chunks.length > 0) {
                    let chunk = new PushReq();
                    chunk.setChunk(Buffer.concat(chunks));
                    stream.write(chunk);
                    // clear chunk
                    chunks = [];
                }
                stream.end();
            });
        });
    }

    createWriteStream(input: PushInput): Writable {
        const req = new PushReq();
        const md = new Metadata();
        md.setKey(input.key);
        md.setBucket(input.bucket);
        md.setContenttype(input.contentType);
        md.setConcurrent(input.concurrent);
        md.setExpiresinseconds(input.expireInSeconds);
        md.setSize(input.length);
        md.setExtension$(input.extension);
        req.setMetadata(md);

        const stream = this._client.push((err, _) => {
            if (err) {
                throw new SpaceProxyError('unknown', err.message);
            }
        });
        stream.write(req);
        const wr = new Writable({
            write(data: Buffer, encoding, callback) {
                let chunk = new PushReq();
                chunk.setChunk(data);
                stream.write(chunk)
                callback();
            }
        });
        wr.on("finish", () => {
            stream.end()
        });
        return wr;
    }

    copy(input: CopyInput): Promise<CopyOutput> {
        const req = new CopyFromReq()
        req.setBucket(input.bucket);
        req.setKey(input.key);
        req.setUri(input.url);
        for (const [key, value] of Object.entries(input.headers)) {
            req.getHeadersMap().set(`${key}`, `${value}`);
        }
        return new Promise((resolve, reject) => {
            this._client.copyFrom(req, (err, res) => {
                if (err) {
                    reject(SpaceProxyError.Resolve(err.message));
                    return;
                }
                resolve({
                    key: res.getName(),
                    size: res.getSize(),
                    hash: res.getHash(),
                });
            });
        });
    }

    startSyncStatus() {
        this._connect = true;
        if (!this._syncStatusTimer) {
            this.verifyState();
            return;
        }
    }

    stopSyncStatus() {
        this._connect = false;
        if (this._syncStatusTimer) {
            clearInterval(this._syncStatusTimer);
            this._syncStatusTimer = null;
        }
    }

    verifyState() {
        const cli = this._client;
        this._syncStatusTimer = setInterval(() => {
            const state = cli.getChannel().getConnectivityState(false);
            this._connect = state === ConnectivityState.READY;
        }, 5000);
    }
}