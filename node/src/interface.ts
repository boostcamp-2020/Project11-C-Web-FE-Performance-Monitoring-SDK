export interface reqInfoType {
  browser: string;
  language: string;
  method: string;
  url: string;
  body: string;
  type: string;
  arch: string;
  platform: string;
  hostName: string;
  osVersion: string;
  runtimeName: string;
  runtimeVersion: string;
}

export interface tagType {
  type: string;
  arch: string;
  platform: string;
  hostName: string;
  osVersion: string;
  runtimeName: string;
  runtimeVersion: string;
}

export interface errorArea {
  key: number[];
  value: string[];
}

export interface Reason {
  name: string;
  stack: string;
  message: string;
}
