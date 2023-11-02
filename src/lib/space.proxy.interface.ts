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
import {SpaceProxyStream} from "./space.proxy.stream";
import {Readable, Writable} from "stream";

export interface SpaceProxy {
    head(input: HeadInput): Promise<HeadOutput>;

    fetchAndConvert(input: FetchInput): SpaceProxyStream | Promise<SpaceProxyStream>;

    fetch(input: FetchInput): SpaceProxyStream | Promise<SpaceProxyStream>;

    drop(input: DropInput): Promise<DropOutput>;

    push(input: PushInput, readable: Readable | Buffer): Promise<PushOutput>;

    copyFrom(input: CopyInput): Promise<CopyOutput>;

    createWriteStream(input: PushInput): Writable | Promise<Writable>;

    disconnect();

    isConnected(): boolean | Promise<boolean>;
}