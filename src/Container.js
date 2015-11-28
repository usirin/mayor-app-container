export default class Container {

  constructor() {
    this.bindings = {}
    this.instances = {}
  }

  /**
   * Register a binding with given closure.
   *
   * @public
   * @param {String} key - binding name
   * @param {Function} closure - to be resolved closure
   * @param {Boolean=} shared = false - if yes given closure will be resolved only once
   */
  bind(key, closure, shared = false) {
    let binding = { closure, shared }
    this.bindings[key] = binding
  }

  /**
   * Register a binding if it's not bound yet.
   *
   * @public
   * @param {String} key
   * @param {Array} ...args
   */
  bindIf(key, ...args) {
    if ( this.bindings[key] ) {
      return
    }

    this.bind(key, ...args)
  }

  /**
   * Register a shared binding.
   *
   * @public
   * @param {String} key
   * @param {Function} closure
   */
  singleton(key, closure) {
    this.bind(key, closure, true)
  }

  /**
   * Register an existing instance as shared binding.
   *
   * @public
   * @param {String} key
   * @param {Object} instance
   */
  instance(key, instance) {
    let closure = () => instance
    this.bind(key, closure, true)
  }

  /**
   * Resolve given key.
   *
   * @public
   * @param {string} key
   * @return {Object}
   */
  make(key) {

    // there is already registered instance return that.
    if ( this.instances.hasOwnProperty(key) ) {
      return this.instances[key]
    }

    let { closure, shared } = this.bindings[key]

    let result = closure.call(null, this)

    if (shared) {
      this.instance(key, result)
    }

    return result
  }
}
