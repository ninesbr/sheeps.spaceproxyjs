import {DropInput, DropOutput, FetchInput, HeadInput, HeadOutput, PushInput, PushOutput} from "./space.proxy.data";
import {Readable} from "stream";
import {SpaceProxyStream} from "./space.proxy.stream";

export interface SpaceProxyServerInterface {
    connect(waitSeconds?: number): Promise<SpaceProxyServerInterface>;

    getHead(input: HeadInput): Promise<HeadOutput>;

    fetchConvert(input: FetchInput): SpaceProxyStream;

    fetch(input: FetchInput): SpaceProxyStream;

    drop(input: DropInput): Promise<DropOutput>;

    push(input: PushInput, readable: Readable | Buffer): Promise<PushOutput>;

    disconnect();

    isConnected(): boolean
}