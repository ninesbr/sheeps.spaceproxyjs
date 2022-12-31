// package: pb
// file: message.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as message_pb from "./message_pb";

interface IStorageCloudServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    head: IStorageCloudServiceService_IHead;
    fetch: IStorageCloudServiceService_IFetch;
    fetchAndConvert: IStorageCloudServiceService_IFetchAndConvert;
    push: IStorageCloudServiceService_IPush;
    drop: IStorageCloudServiceService_IDrop;
}

interface IStorageCloudServiceService_IHead extends grpc.MethodDefinition<message_pb.HeadReq, message_pb.HeadRes> {
    path: "/pb.StorageCloudService/Head";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<message_pb.HeadReq>;
    requestDeserialize: grpc.deserialize<message_pb.HeadReq>;
    responseSerialize: grpc.serialize<message_pb.HeadRes>;
    responseDeserialize: grpc.deserialize<message_pb.HeadRes>;
}
interface IStorageCloudServiceService_IFetch extends grpc.MethodDefinition<message_pb.FetchReq, message_pb.FetchRes> {
    path: "/pb.StorageCloudService/Fetch";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<message_pb.FetchReq>;
    requestDeserialize: grpc.deserialize<message_pb.FetchReq>;
    responseSerialize: grpc.serialize<message_pb.FetchRes>;
    responseDeserialize: grpc.deserialize<message_pb.FetchRes>;
}
interface IStorageCloudServiceService_IFetchAndConvert extends grpc.MethodDefinition<message_pb.FetchConvertReq, message_pb.FetchRes> {
    path: "/pb.StorageCloudService/FetchAndConvert";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<message_pb.FetchConvertReq>;
    requestDeserialize: grpc.deserialize<message_pb.FetchConvertReq>;
    responseSerialize: grpc.serialize<message_pb.FetchRes>;
    responseDeserialize: grpc.deserialize<message_pb.FetchRes>;
}
interface IStorageCloudServiceService_IPush extends grpc.MethodDefinition<message_pb.PushReq, message_pb.PushRes> {
    path: "/pb.StorageCloudService/Push";
    requestStream: true;
    responseStream: false;
    requestSerialize: grpc.serialize<message_pb.PushReq>;
    requestDeserialize: grpc.deserialize<message_pb.PushReq>;
    responseSerialize: grpc.serialize<message_pb.PushRes>;
    responseDeserialize: grpc.deserialize<message_pb.PushRes>;
}
interface IStorageCloudServiceService_IDrop extends grpc.MethodDefinition<message_pb.DropReq, message_pb.DropRes> {
    path: "/pb.StorageCloudService/Drop";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<message_pb.DropReq>;
    requestDeserialize: grpc.deserialize<message_pb.DropReq>;
    responseSerialize: grpc.serialize<message_pb.DropRes>;
    responseDeserialize: grpc.deserialize<message_pb.DropRes>;
}

export const StorageCloudServiceService: IStorageCloudServiceService;

export interface IStorageCloudServiceServer extends grpc.UntypedServiceImplementation {
    head: grpc.handleUnaryCall<message_pb.HeadReq, message_pb.HeadRes>;
    fetch: grpc.handleServerStreamingCall<message_pb.FetchReq, message_pb.FetchRes>;
    fetchAndConvert: grpc.handleServerStreamingCall<message_pb.FetchConvertReq, message_pb.FetchRes>;
    push: grpc.handleClientStreamingCall<message_pb.PushReq, message_pb.PushRes>;
    drop: grpc.handleUnaryCall<message_pb.DropReq, message_pb.DropRes>;
}

export interface IStorageCloudServiceClient {
    head(request: message_pb.HeadReq, callback: (error: grpc.ServiceError | null, response: message_pb.HeadRes) => void): grpc.ClientUnaryCall;
    head(request: message_pb.HeadReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.HeadRes) => void): grpc.ClientUnaryCall;
    head(request: message_pb.HeadReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.HeadRes) => void): grpc.ClientUnaryCall;
    fetch(request: message_pb.FetchReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<message_pb.FetchRes>;
    fetch(request: message_pb.FetchReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<message_pb.FetchRes>;
    fetchAndConvert(request: message_pb.FetchConvertReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<message_pb.FetchRes>;
    fetchAndConvert(request: message_pb.FetchConvertReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<message_pb.FetchRes>;
    push(callback: (error: grpc.ServiceError | null, response: message_pb.PushRes) => void): grpc.ClientWritableStream<message_pb.PushReq>;
    push(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PushRes) => void): grpc.ClientWritableStream<message_pb.PushReq>;
    push(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PushRes) => void): grpc.ClientWritableStream<message_pb.PushReq>;
    push(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PushRes) => void): grpc.ClientWritableStream<message_pb.PushReq>;
    drop(request: message_pb.DropReq, callback: (error: grpc.ServiceError | null, response: message_pb.DropRes) => void): grpc.ClientUnaryCall;
    drop(request: message_pb.DropReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.DropRes) => void): grpc.ClientUnaryCall;
    drop(request: message_pb.DropReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.DropRes) => void): grpc.ClientUnaryCall;
}

export class StorageCloudServiceClient extends grpc.Client implements IStorageCloudServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public head(request: message_pb.HeadReq, callback: (error: grpc.ServiceError | null, response: message_pb.HeadRes) => void): grpc.ClientUnaryCall;
    public head(request: message_pb.HeadReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.HeadRes) => void): grpc.ClientUnaryCall;
    public head(request: message_pb.HeadReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.HeadRes) => void): grpc.ClientUnaryCall;
    public fetch(request: message_pb.FetchReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<message_pb.FetchRes>;
    public fetch(request: message_pb.FetchReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<message_pb.FetchRes>;
    public fetchAndConvert(request: message_pb.FetchConvertReq, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<message_pb.FetchRes>;
    public fetchAndConvert(request: message_pb.FetchConvertReq, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<message_pb.FetchRes>;
    public push(callback: (error: grpc.ServiceError | null, response: message_pb.PushRes) => void): grpc.ClientWritableStream<message_pb.PushReq>;
    public push(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.PushRes) => void): grpc.ClientWritableStream<message_pb.PushReq>;
    public push(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PushRes) => void): grpc.ClientWritableStream<message_pb.PushReq>;
    public push(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.PushRes) => void): grpc.ClientWritableStream<message_pb.PushReq>;
    public drop(request: message_pb.DropReq, callback: (error: grpc.ServiceError | null, response: message_pb.DropRes) => void): grpc.ClientUnaryCall;
    public drop(request: message_pb.DropReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: message_pb.DropRes) => void): grpc.ClientUnaryCall;
    public drop(request: message_pb.DropReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: message_pb.DropRes) => void): grpc.ClientUnaryCall;
}
