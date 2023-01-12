// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var message_pb = require('./message_pb.js');

function serialize_pb_CopyFromReq(arg) {
  if (!(arg instanceof message_pb.CopyFromReq)) {
    throw new Error('Expected argument of type pb.CopyFromReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_CopyFromReq(buffer_arg) {
  return message_pb.CopyFromReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_CopyFromRes(arg) {
  if (!(arg instanceof message_pb.CopyFromRes)) {
    throw new Error('Expected argument of type pb.CopyFromRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_CopyFromRes(buffer_arg) {
  return message_pb.CopyFromRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_DropReq(arg) {
  if (!(arg instanceof message_pb.DropReq)) {
    throw new Error('Expected argument of type pb.DropReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_DropReq(buffer_arg) {
  return message_pb.DropReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_DropRes(arg) {
  if (!(arg instanceof message_pb.DropRes)) {
    throw new Error('Expected argument of type pb.DropRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_DropRes(buffer_arg) {
  return message_pb.DropRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_FetchConvertReq(arg) {
  if (!(arg instanceof message_pb.FetchConvertReq)) {
    throw new Error('Expected argument of type pb.FetchConvertReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_FetchConvertReq(buffer_arg) {
  return message_pb.FetchConvertReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_FetchReq(arg) {
  if (!(arg instanceof message_pb.FetchReq)) {
    throw new Error('Expected argument of type pb.FetchReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_FetchReq(buffer_arg) {
  return message_pb.FetchReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_FetchRes(arg) {
  if (!(arg instanceof message_pb.FetchRes)) {
    throw new Error('Expected argument of type pb.FetchRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_FetchRes(buffer_arg) {
  return message_pb.FetchRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_HeadReq(arg) {
  if (!(arg instanceof message_pb.HeadReq)) {
    throw new Error('Expected argument of type pb.HeadReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_HeadReq(buffer_arg) {
  return message_pb.HeadReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_HeadRes(arg) {
  if (!(arg instanceof message_pb.HeadRes)) {
    throw new Error('Expected argument of type pb.HeadRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_HeadRes(buffer_arg) {
  return message_pb.HeadRes.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_PushReq(arg) {
  if (!(arg instanceof message_pb.PushReq)) {
    throw new Error('Expected argument of type pb.PushReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_PushReq(buffer_arg) {
  return message_pb.PushReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_PushRes(arg) {
  if (!(arg instanceof message_pb.PushRes)) {
    throw new Error('Expected argument of type pb.PushRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_PushRes(buffer_arg) {
  return message_pb.PushRes.deserializeBinary(new Uint8Array(buffer_arg));
}


var StorageCloudServiceService = exports.StorageCloudServiceService = {
  head: {
    path: '/pb.StorageCloudService/Head',
    requestStream: false,
    responseStream: false,
    requestType: message_pb.HeadReq,
    responseType: message_pb.HeadRes,
    requestSerialize: serialize_pb_HeadReq,
    requestDeserialize: deserialize_pb_HeadReq,
    responseSerialize: serialize_pb_HeadRes,
    responseDeserialize: deserialize_pb_HeadRes,
  },
  fetch: {
    path: '/pb.StorageCloudService/Fetch',
    requestStream: false,
    responseStream: true,
    requestType: message_pb.FetchReq,
    responseType: message_pb.FetchRes,
    requestSerialize: serialize_pb_FetchReq,
    requestDeserialize: deserialize_pb_FetchReq,
    responseSerialize: serialize_pb_FetchRes,
    responseDeserialize: deserialize_pb_FetchRes,
  },
  fetchAndConvert: {
    path: '/pb.StorageCloudService/FetchAndConvert',
    requestStream: false,
    responseStream: true,
    requestType: message_pb.FetchConvertReq,
    responseType: message_pb.FetchRes,
    requestSerialize: serialize_pb_FetchConvertReq,
    requestDeserialize: deserialize_pb_FetchConvertReq,
    responseSerialize: serialize_pb_FetchRes,
    responseDeserialize: deserialize_pb_FetchRes,
  },
  push: {
    path: '/pb.StorageCloudService/Push',
    requestStream: true,
    responseStream: false,
    requestType: message_pb.PushReq,
    responseType: message_pb.PushRes,
    requestSerialize: serialize_pb_PushReq,
    requestDeserialize: deserialize_pb_PushReq,
    responseSerialize: serialize_pb_PushRes,
    responseDeserialize: deserialize_pb_PushRes,
  },
  drop: {
    path: '/pb.StorageCloudService/Drop',
    requestStream: false,
    responseStream: false,
    requestType: message_pb.DropReq,
    responseType: message_pb.DropRes,
    requestSerialize: serialize_pb_DropReq,
    requestDeserialize: deserialize_pb_DropReq,
    responseSerialize: serialize_pb_DropRes,
    responseDeserialize: deserialize_pb_DropRes,
  },
  copyFrom: {
    path: '/pb.StorageCloudService/CopyFrom',
    requestStream: false,
    responseStream: false,
    requestType: message_pb.CopyFromReq,
    responseType: message_pb.CopyFromRes,
    requestSerialize: serialize_pb_CopyFromReq,
    requestDeserialize: deserialize_pb_CopyFromReq,
    responseSerialize: serialize_pb_CopyFromRes,
    responseDeserialize: deserialize_pb_CopyFromRes,
  },
};

exports.StorageCloudServiceClient = grpc.makeGenericClientConstructor(StorageCloudServiceService);
