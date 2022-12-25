import {HeadInput, HeadOutput} from "./space.proxy.data";

export interface SpaceProxy {
    getDetails(input: HeadInput): Promise<HeadOutput>;
    disconnect();
}