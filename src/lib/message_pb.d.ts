// package: pb
// file: message.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Metadata extends jspb.Message { 
    getKey(): string;
    setKey(value: string): Metadata;
    getContenttype(): string;
    setContenttype(value: string): Metadata;
    getBucket(): string;
    setBucket(value: string): Metadata;
    getExtension$(): string;
    setExtension$(value: string): Metadata;
    getConcurrent(): number;
    setConcurrent(value: number): Metadata;
    getExpiresinseconds(): number;
    setExpiresinseconds(value: number): Metadata;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Metadata.AsObject;
    static toObject(includeInstance: boolean, msg: Metadata): Metadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Metadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Metadata;
    static deserializeBinaryFromReader(message: Metadata, reader: jspb.BinaryReader): Metadata;
}

export namespace Metadata {
    export type AsObject = {
        key: string,
        contenttype: string,
        bucket: string,
        extension: string,
        concurrent: number,
        expiresinseconds: number,
    }
}

export class PushReq extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): Metadata | undefined;
    setMetadata(value?: Metadata): PushReq;

    hasChunk(): boolean;
    clearChunk(): void;
    getChunk(): Uint8Array | string;
    getChunk_asU8(): Uint8Array;
    getChunk_asB64(): string;
    setChunk(value: Uint8Array | string): PushReq;

    getDataCase(): PushReq.DataCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PushReq.AsObject;
    static toObject(includeInstance: boolean, msg: PushReq): PushReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PushReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PushReq;
    static deserializeBinaryFromReader(message: PushReq, reader: jspb.BinaryReader): PushReq;
}

export namespace PushReq {
    export type AsObject = {
        metadata?: Metadata.AsObject,
        chunk: Uint8Array | string,
    }

    export enum DataCase {
        DATA_NOT_SET = 0,
        METADATA = 1,
        CHUNK = 2,
    }

}

export class PushRes extends jspb.Message { 
    getName(): string;
    setName(value: string): PushRes;
    getSize(): number;
    setSize(value: number): PushRes;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PushRes.AsObject;
    static toObject(includeInstance: boolean, msg: PushRes): PushRes.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PushRes, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PushRes;
    static deserializeBinaryFromReader(message: PushRes, reader: jspb.BinaryReader): PushRes;
}

export namespace PushRes {
    export type AsObject = {
        name: string,
        size: number,
    }
}

export class HeadReq extends jspb.Message { 
    getBucket(): string;
    setBucket(value: string): HeadReq;
    getKey(): string;
    setKey(value: string): HeadReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HeadReq.AsObject;
    static toObject(includeInstance: boolean, msg: HeadReq): HeadReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HeadReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HeadReq;
    static deserializeBinaryFromReader(message: HeadReq, reader: jspb.BinaryReader): HeadReq;
}

export namespace HeadReq {
    export type AsObject = {
        bucket: string,
        key: string,
    }
}

export class HeadRes extends jspb.Message { 
    getBucket(): string;
    setBucket(value: string): HeadRes;
    getKey(): string;
    setKey(value: string): HeadRes;
    getSize(): number;
    setSize(value: number): HeadRes;
    getContenttype(): string;
    setContenttype(value: string): HeadRes;

    getMetadataMap(): jspb.Map<string, string>;
    clearMetadataMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HeadRes.AsObject;
    static toObject(includeInstance: boolean, msg: HeadRes): HeadRes.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HeadRes, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HeadRes;
    static deserializeBinaryFromReader(message: HeadRes, reader: jspb.BinaryReader): HeadRes;
}

export namespace HeadRes {
    export type AsObject = {
        bucket: string,
        key: string,
        size: number,
        contenttype: string,

        metadataMap: Array<[string, string]>,
    }
}

export class FetchReq extends jspb.Message { 
    getBucket(): string;
    setBucket(value: string): FetchReq;
    getKey(): string;
    setKey(value: string): FetchReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FetchReq.AsObject;
    static toObject(includeInstance: boolean, msg: FetchReq): FetchReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FetchReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FetchReq;
    static deserializeBinaryFromReader(message: FetchReq, reader: jspb.BinaryReader): FetchReq;
}

export namespace FetchReq {
    export type AsObject = {
        bucket: string,
        key: string,
    }
}

export class FetchConvertReq extends jspb.Message { 
    getBucket(): string;
    setBucket(value: string): FetchConvertReq;
    getKey(): string;
    setKey(value: string): FetchConvertReq;
    getFormat(): string;
    setFormat(value: string): FetchConvertReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FetchConvertReq.AsObject;
    static toObject(includeInstance: boolean, msg: FetchConvertReq): FetchConvertReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FetchConvertReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FetchConvertReq;
    static deserializeBinaryFromReader(message: FetchConvertReq, reader: jspb.BinaryReader): FetchConvertReq;
}

export namespace FetchConvertReq {
    export type AsObject = {
        bucket: string,
        key: string,
        format: string,
    }
}

export class FetchRes extends jspb.Message { 
    getBucket(): string;
    setBucket(value: string): FetchRes;
    getKey(): string;
    setKey(value: string): FetchRes;
    getSize(): number;
    setSize(value: number): FetchRes;
    getContenttype(): string;
    setContenttype(value: string): FetchRes;
    getPart(): number;
    setPart(value: number): FetchRes;
    getData(): Uint8Array | string;
    getData_asU8(): Uint8Array;
    getData_asB64(): string;
    setData(value: Uint8Array | string): FetchRes;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FetchRes.AsObject;
    static toObject(includeInstance: boolean, msg: FetchRes): FetchRes.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FetchRes, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FetchRes;
    static deserializeBinaryFromReader(message: FetchRes, reader: jspb.BinaryReader): FetchRes;
}

export namespace FetchRes {
    export type AsObject = {
        bucket: string,
        key: string,
        size: number,
        contenttype: string,
        part: number,
        data: Uint8Array | string,
    }
}

export class DropReq extends jspb.Message { 
    getBucket(): string;
    setBucket(value: string): DropReq;
    getKey(): string;
    setKey(value: string): DropReq;
    getPrefixmatch(): boolean;
    setPrefixmatch(value: boolean): DropReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DropReq.AsObject;
    static toObject(includeInstance: boolean, msg: DropReq): DropReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DropReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DropReq;
    static deserializeBinaryFromReader(message: DropReq, reader: jspb.BinaryReader): DropReq;
}

export namespace DropReq {
    export type AsObject = {
        bucket: string,
        key: string,
        prefixmatch: boolean,
    }
}

export class DropRes extends jspb.Message { 
    getKey(): string;
    setKey(value: string): DropRes;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DropRes.AsObject;
    static toObject(includeInstance: boolean, msg: DropRes): DropRes.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DropRes, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DropRes;
    static deserializeBinaryFromReader(message: DropRes, reader: jspb.BinaryReader): DropRes;
}

export namespace DropRes {
    export type AsObject = {
        key: string,
    }
}
