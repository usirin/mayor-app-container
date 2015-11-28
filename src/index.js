import assign from 'lodash.assign'
import invariant from 'invariant'
import Container from './Container'
import { isServiceProvider } from './ServiceProvider'

export default class AppContainer extends Container {

  constructor() {
    super()
    this.serviceProviders = {}
  }

  /**
   * Register a provider.
   *
   * @public
   * @param {object} provider
   */
  register(ProviderClass) {

    invariant(
      isServiceProvider(ProviderClass),
      'AppContainer#register: expected provider to be a ServiceProvider, got %s',
      typeof ProviderClass
    )

    let provider = this.resolveProviderClass(ProviderClass)

    provider.register()

    this.markAsRegistered(provider)
  }

  /**
   * Resolve a provider class.
   *
   * @public
   * @param {class} ServiceProviderClass
   * @return {object}
   */
  resolveProviderClass(ServiceProviderClass) {
    return new ServiceProviderClass(this)
  }

  /**
   * Return names of registered service providers.
   *
   * @public
   * @return {array}
   */
  getProviderNames() {
    let providers = this.serviceProviders

    return Object.keys(providers).map(key => {
      return providers[key].getName()
    })
  }

  /**
   * Mark provider instance as registered.
   *
   * @public
   * @param {object} provider
   * @return {object} registered service providers
   */
  markAsRegistered(provider) {
    this.serviceProviders = assign({}, this.serviceProviders, {
      [provider.getName()]: provider
    })

    return this.serviceProviders
  }
}

