import { Pool } from 'sequelize-pool';
import {New} from "./space.proxy";
import {isEmpty} from "class-validator";
import {SpaceProxy} from "./space.proxy.interface";
import {SpaceProxyConfiguration} from "./space.proxy.data";

export class SpaceProxyPool {

    private readonly pool: Pool<SpaceProxy>;
    constructor(config: SpaceProxyConfiguration) {

        if (isEmpty(config.host)) {
            throw new Error("host is required");
        }

        if (isEmpty(config.port)) {
            throw new Error("port is required");
        }

        this.pool = new Pool({
            name: config.poolName || 'jsonStoragePool',
            create: async (): Promise<SpaceProxy> => {
                return await New({
                    host: config.host,
                    port: config.port,

                    insecure: (config.insecure == undefined) ? true : config?.insecure,
                    chunkSize: config.chunkSize,
                    readTimeoutInSeconds: config.readTimeoutInSeconds || 30,

                });
            },
            destroy: (conn: SpaceProxy) => {
                conn.disconnect();
            },
            validate: (conn: SpaceProxy): boolean => {
                return conn.isConnected() as boolean;
            },
            max: config.poolMax || 2,
            min: config.poolMin || 1,
        });
    }

    public async exec <T>(func: (session: SpaceProxy) => Promise<T>): Promise<T>  {
        let spaceProxy: SpaceProxy;
        try {
            spaceProxy = await this.pool.acquire();
            return await func(spaceProxy);
        } catch (e: any) {
            throw e;
        } finally {
            if (spaceProxy) {
                this.pool.release(spaceProxy);
            }
        }
    };

    public async destroy(): Promise<void> {
       await this.pool.drain();
       await this.pool.destroyAllNow();
    }

    public async destroyQuietly(): Promise<void> {
        try {
            await this.destroy();
        } catch (e: any) {
            // do nothing
        }
    }

}
