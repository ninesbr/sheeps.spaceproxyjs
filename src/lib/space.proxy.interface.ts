import {DropInput, DropOutput, FetchInput, HeadInput, HeadOutput, PushInput, PushOutput} from "./space.proxy.data";
import {SpaceProxyStream} from "./space.proxy.stream";
import {Readable} from "stream";

export interface SpaceProxy {
    head(input: HeadInput): Promise<HeadOutput>;

    fetchAndConvert(input: FetchInput): SpaceProxyStream;

    fetch(input: FetchInput): SpaceProxyStream;

    drop(input: DropInput): Promise<DropOutput>;

    push(input: PushInput, readable: Readable | Buffer): Promise<PushOutput>;

    disconnect();

    isConnected(): boolean;
}