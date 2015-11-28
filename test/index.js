import expect from 'expect'
import { Reactor } from 'nuclear-js'

import AppContainer from '../src'
import ServiceProvider from '../src/ServiceProvider'

let uid = () => `${Date.now()}`

let createServiceProvider = (config) => {
  class _ServiceProvider extends ServiceProvider {
    constructor(app) {
      super(app)
      Object.keys(config).forEach((key) => {
        if (key !== 'init') this[key] = config[key]
      })
      if (config.init) {
        config.init(app)
      }

      this.name = uid()
    }
    getName() {
      return this.name
    }
  }

  return _ServiceProvider
}


describe('AppContainer', () => {
  it('works', () => {
    expect(new AppContainer).toExist()
  })

  it("registers services providers correctly", () => {
    let app = new AppContainer

    // app.register()
  })

  describe('#register', () => {


    it("throws if given provider is not a class", () => {
      let container = new AppContainer

      expect(() => {
        container.register({})
      }).toThrow(/expected provider to be a ServiceProvider/)
    })

    it("calls given service provider's register method", () => {
      let flag = false
      let ServiceProvider = createServiceProvider({
        register() {
          flag = true
        }
      })

      let container = new AppContainer
      container.register(ServiceProvider)

      expect(flag).toBe(true)
    })

    it("initializes given service provider if it's a class", () => {
      let flag = false
      let ServiceProvider = createServiceProvider({
        register() {
          flag = true
        }
      })

      let container = new AppContainer
      container.register(ServiceProvider)

      expect(flag).toBe(true)
    })

    it("injects app container to given service provider class", () => {
      let _app = null
      let ServiceProvider = createServiceProvider({
        init(app) {
          _app = app
        }
      })

      let container = new AppContainer
      container.register(ServiceProvider)

      expect(_app).toBe(container)
    })

    it("marks given provider as registered", () => {
      let ServiceProvider = createServiceProvider({
        getName() { return 'MockServiceProvider' }
      })

      let container = new AppContainer
      container.register(ServiceProvider)

      expect(
        container.getProviderNames()
      ).toInclude('MockServiceProvider')
    })

  })
})

