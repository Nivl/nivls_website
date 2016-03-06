import { EventEmitter, Injectable } from 'angular2/core';

export class HeaderType {
  static get _types() {
    return {
      branding: 2,
      product : 3,
    };
  }

  static get branding() {
    return HeaderType.types.branding;
  }

  static get product() {
    return HeaderType.types.product;
  }

  static isValid(type) {
    return Object.values(HeaderType.types).indexOf(type) > -1;
  }
}

@Injectable()
export default class AppService {
  constructor() {
    this.header = new EventEmitter();
  }

  setHeader(headerType) {
    if (HeaderType.isValid(headerType)) {
      this.header.emit(headerType);
    } else {
      throw new Error(`${headerType} is not a valid HeaderType value`);
    }
  }
}
