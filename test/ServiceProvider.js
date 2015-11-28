import expect from 'expect'

import ServiceProvider from '../src/ServiceProvider'
import AppContainer from '../src'

describe('ServiceProvider', () => {
  it('works', () => {
    expect(ServiceProvider).toExist()
  })

  it('gets app injected', () => {
    let container = new AppContainer
    let resolved = new ServiceProvider(container)
    expect(resolved.getApp()).toBe(container)
  })
})
