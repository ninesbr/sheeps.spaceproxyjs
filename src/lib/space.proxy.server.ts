import {StorageCloudServiceClient} from "./message_grpc_pb";
import {ChannelCredentials} from "@grpc/grpc-js";
import {SpaceProxyServerInterface} from "./space.proxy.server.interfaces";
import {SpaceProxyError} from "./space.proxy.error";
import {HeadReq} from "./message_pb";
import {HeadInput, HeadOutput} from "./space.proxy.data";

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
                for (const [k,v] of res.getMetadataMap()) {
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
}