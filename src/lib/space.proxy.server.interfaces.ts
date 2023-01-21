import {
    CopyInput, CopyOutput,
    DropInput,
    DropOutput,
    FetchInput,
    HeadInput,
    HeadOutput,
    PushInput,
    PushOutput
} from "./space.proxy.data";
import {Readable, Writable} from "stream";
import {SpaceProxyStream} from "./space.proxy.stream";

export interface SpaceProxyServerInterface {
    connect(waitSeconds?: number): Promise<SpaceProxyServerInterface>;

    getHead(input: HeadInput): Promise<HeadOutput>;

    fetchConvert(input: FetchInput): SpaceProxyStream;

    fetch(input: FetchInput): SpaceProxyStream;

    drop(input: DropInput): Promise<DropOutput>;

    push(input: PushInput, readable: Readable | Buffer): Promise<PushOutput>;

    copy(input: CopyInput): Promise<CopyOutput>;

    createWriteStream(input: PushInput): Writable;

    disconnect();

    isConnected(): boolean
}