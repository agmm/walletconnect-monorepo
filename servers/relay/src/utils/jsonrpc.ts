import { JsonRpcRequest } from "@json-rpc-tools/utils";
import { RelayTypes } from "@walletconnect/types";

import { assertType } from "./misc";

export function isSubscribeParams(params: any): params is RelayTypes.SubscribeParams {
  return "topic" in params && "ttl" in params;
}

export function parseSubscribeRequest(request: JsonRpcRequest): RelayTypes.SubscribeParams {
  const params = request.params as RelayTypes.SubscribeParams;
  assertType(params, "topic");
  return params;
}

export function isPublishParams(params: any): params is RelayTypes.PublishParams {
  return "message" in params && "topic" in params && "ttl" in params;
}

export function parsePublishRequest(request: JsonRpcRequest): RelayTypes.PublishParams {
  const params = request.params as RelayTypes.PublishParams;
  assertType(params, "topic");
  assertType(params, "message");
  assertType(params, "ttl", "number");
  return params;
}

export function isUnsubscribeParams(params: any): params is RelayTypes.UnsubscribeParams {
  return "id" in params;
}

// I don't want to do this because I have to pass the value of the ttl from somewhere that redis is using
export function isTtlAboveMaximum(params: RelayTypes.SubscribeParams | RelayTypes.PublishParams): boolean {
  //return params.ttl > config.redis
  return true;
}

export function parseUnsubscribeRequest(request: JsonRpcRequest): RelayTypes.UnsubscribeParams {
  const params = request.params as RelayTypes.UnsubscribeParams;

  assertType(params, "id");

  return params;
}
