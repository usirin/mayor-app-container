import isFunction from 'lodash.isfunction'
import isPlainObject from 'lodash.isplainobject'

export default class ServiceProvider {
  register() {
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


