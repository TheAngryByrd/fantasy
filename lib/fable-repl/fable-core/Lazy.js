export function createFromValue(v) {
  return new Lazy(() => v);
}
export default class Lazy {
  constructor(factory) {
    this.factory = factory;
    this.isValueCreated = false;
  }
  get value() {
    if (!this.isValueCreated) {
      this.createdValue = this.factory();
      this.isValueCreated = true;
    }
    return this.createdValue;
  }
}