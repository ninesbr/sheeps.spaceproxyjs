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

export interface ApophisConfiguration {
    host: string
    port: number
    insecure?: boolean
    readTimeoutInSeconds?: number
}