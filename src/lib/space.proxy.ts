import {SpaceProxy} from "./space.proxy.interface";
import {
    SpaceProxyConfiguration,
    DropInput,
    DropOutput,
    FetchInput,
    HeadInput,
    HeadOutput,
    PushInput
} from "./space.proxy.data";
import {SpaceProxyServerInterface} from "./space.proxy.server.interfaces";
import {SpaceProxyServer} from "./space.proxy.server";
import {SpaceProxyStream} from "./space.proxy.stream";
import {Readable} from "stream";

export const New = async (config: SpaceProxyConfiguration): Promise<SpaceProxy> => {
    const server = new SpaceProxyServer(config.host, config.port, config.insecure, config.chunkSize);
    await server.connect(config.readTimeoutInSeconds);
    return new SpaceProxyImpl(server);
    ;
}

export class SpaceProxyImpl implements SpaceProxy {
    private readonly _server: SpaceProxyServerInterface;

    constructor(server: SpaceProxyServerInterface) {
        this._server = server;
    }

    head(input: HeadInput): Promise<HeadOutput> {
        return this._server.getHead(input);
    }

    fetchAndConvert(input: FetchInput): SpaceProxyStream {
        return this._server.fetchConvert(input);
    }

    fetch(input: FetchInput): SpaceProxyStream {
        return this._server.fetch(input);
    }

    drop(input: DropInput): Promise<DropOutput> {
        return this._server.drop(input);
    }

    push(input: PushInput, readable: Readable | Buffer): Promise<any> {
        return this._server.push(input, readable);
    }

    disconnect() {
        this._server.disconnect();
    }

    isConnected(): boolean {
        return this._server.isConnected();
    }
}