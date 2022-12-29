import {Readable, Writable} from "stream";

export interface SpaceProxyStream {
    syncWrite(wr: Writable): Promise<void>;

    getStream(): Readable;

    getSyncBuffer(): Promise<Uint8Array>;
}

export const BufferAsReadable = (buffer: Buffer): Readable => {
    return new Readable({
        read() {
            this.push(buffer);
            this.push(null);
        }
    });
}