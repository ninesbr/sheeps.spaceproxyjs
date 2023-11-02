export interface HeadInput {
    bucket?: string
    key: string
}

export interface HeadOutput {
    key: string
    size: number
    contentType: string
    metadata: { [key: string]: any; }
}

export interface FetchInput {
    bucket?: string
    key: string
    format?: string
}

export interface PushInput {
    bucket?: string
    key: string
    contentType: string
    concurrent?: number;
    expireInSeconds?:number;
    length?:number;
    extension?: string;
}

export interface PushOutput {
    key: string
    size: number
    hash: string
}

export interface DropInput {
    bucket?: string
    key: string
    prefix?: boolean
}

export interface DropOutput {
    key: string
}

export interface CopyInput {
    bucket?: string
    key: string
    url: string
    headers:  { [key: string]: any; }
}

export interface CopyOutput {
    key: string
    size: number
    hash: string
}

export interface SpaceProxyConfiguration {
    host: string
    port: number
    insecure?: boolean
    chunkSize?: number
    readTimeoutInSeconds?: number
    poolName?: string
    poolMax?: number
    poolMin?: number
}