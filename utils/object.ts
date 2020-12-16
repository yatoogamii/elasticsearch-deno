export const isObject = (obj: any): obj is Object =>
  Object.prototype.toString.call(obj) === "[object Object]";

export const isObjectEmpty = (obj: Object) => Object.keys(obj).length > 0;
