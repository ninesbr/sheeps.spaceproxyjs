import {SpaceProxy} from "./space.proxy.interface";
import {Readable, Writable} from "stream";
import {
    CopyInput,
    CopyOutput,
    DropInput,
    DropOutput,
    FetchInput,
    HeadInput,
    HeadOutput,
    PushInput, PushOutput, SpaceProxyConfiguration
} from "./space.proxy.data";
import {SpaceProxyStream} from "./space.proxy.stream";
import {SpaceProxyPool} from "./space.proxy.pool";

export class SpaceProxyWithPool implements SpaceProxy {
    private readonly _pool: SpaceProxyPool;
    constructor(config: SpaceProxyConfiguration) {
        this._pool = new SpaceProxyPool(config);
    }
    copyFrom(input: CopyInput): Promise<CopyOutput> {
        return this._pool.exec(async (session: SpaceProxy) => {
            return await session.copyFrom(input);
        });
    }

    createWriteStream(input: PushInput): Promise<Writable> {
        return this._pool.exec(async (session: SpaceProxy) => {
            return session.createWriteStream(input);
        });
    }

    disconnect() {
        this._pool.destroyQuietly().then(r => {});
    }

    drop(input: DropInput): Promise<DropOutput> {
        return this._pool.exec(async (session: SpaceProxy) => {
            return await session.drop(input);
        });
    }

    fetch(input: FetchInput): Promise<SpaceProxyStream> {
        return this._pool.exec(async (session: SpaceProxy) => {
            return session.fetch(input);
        });
    }

    fetchAndConvert(input: FetchInput): Promise<SpaceProxyStream> {
        return this._pool.exec(async (session: SpaceProxy) => {
            return session.fetchAndConvert(input);
        });
    }

    head(input: HeadInput): Promise<HeadOutput> {
       return this._pool.exec(async (session: SpaceProxy) => {
              return await session.head(input);
       });
    }

    isConnected(): Promise<boolean> {
        return this._pool.exec(async (session: SpaceProxy) => {
            return session.isConnected();
        });
    }

    push(input: PushInput, readable: Readable | Buffer): Promise<PushOutput> {
       return this._pool.exec(async (session: SpaceProxy) => {
           return await session.push(input, readable);
       });
    }

}