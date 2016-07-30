export class Payload {
  constructor(attrs = {}) {
    Object.assign(this, attrs);
  }

  asJSON(): any {
    return this;
  }
};
