import isFunction from 'lodash.isfunction'
import isPlainObject from 'lodash.isplainobject'

export default class ServiceProvider {
  constructor(app) {
    this.app = app
  }
  register() {
  }
  getApp() {
    return this.app
  }
}

export function isServiceProvider(x) {
  if (isFunction(x)) {
    return x.prototype && isFunction(x.prototype.register)
  }

  if (isPlainObject(x)) {
    return isFunction(x.register)
  }

  return false
}


