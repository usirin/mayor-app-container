import expect from 'expect'

import Container from '../src/Container'

describe('Container', () => {
  it('works', () => {
    expect(new Container).toExist()
  })

  it('resolves closures', () => {
    let container = new Container
    container.bind('baz', () => 'qux')
    expect(container.make('baz')).toBe('qux')
  })

  it("doesn't register if already a service registered", () => {
    let container = new Container
    container.bind('foo', () => 'bar')
    container.bindIf('foo', () => 'baz')
    expect(container.make('foo')).toBe('bar')
  })

  it('registers a singleton', () => {
    let container = new Container
    let singletonCount = 0
    let instanceCount = 0
    container.bind('Bar', () => instanceCount++)
    container.singleton('Foo', () => singletonCount++)

    let bar1 = container.make('Bar')
    let bar2 = container.make('Bar')

    expect(instanceCount).toBe(2)
    expect(bar1).toNotBe(bar2)

    let foo1 = container.make('Foo')
    let foo2 = container.make('Foo')

    expect(singletonCount).toBe(1)
    expect(foo1).toBe(foo2)
  })

  it('registers an instance', () => {
    let container = new Container

    let fooObj = { name: 'awesomeness' }

    container.instance('foo', fooObj)

    expect(container.make('foo')).toBe(fooObj)
    expect(container.make('foo')).toBe(fooObj)
  })

})
