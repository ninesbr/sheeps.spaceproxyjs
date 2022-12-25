import {HeadInput, HeadOutput} from "./space.proxy.data";

export interface SpaceProxyServerInterface {
    connect(waitSeconds?: number): Promise<SpaceProxyServerInterface>;

    getHead(input: HeadInput): Promise<HeadOutput>;

    disconnect();
}