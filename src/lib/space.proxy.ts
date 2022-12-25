import {SpaceProxy} from "./space.proxy.interface";
import {ApophisConfiguration, HeadInput, HeadOutput} from "./space.proxy.data";
import {SpaceProxyServerInterface} from "./space.proxy.server.interfaces";
import {SpaceProxyServer} from "./space.proxy.server";

export const New = async (config: ApophisConfiguration): Promise<SpaceProxy> => {
    const server = new SpaceProxyServer(config.host, config.port, config.insecure);
    await server.connect(config.readTimeoutInSeconds);
    return new SpaceProxyImpl(server);;
}

export class SpaceProxyImpl implements SpaceProxy {
    private readonly _server: SpaceProxyServerInterface;

    constructor(server: SpaceProxyServerInterface) {
        this._server = server;
    }

    getDetails(input: HeadInput): Promise<HeadOutput> {
        return this._server.getHead(input);
    }

    disconnect() {
        this._server.disconnect();
    }

}