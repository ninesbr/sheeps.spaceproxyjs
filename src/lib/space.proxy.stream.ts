import {Readable, Writable} from "stream";

export interface SpaceProxyStream {
    syncWrite(wr: Writable): Promise<void>;

    getStream(): Readable;

    getSyncBuffer(): Promise<Uint8Array>;
}

