import SizeObservable from './SizeObservable'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'
jest.mock('css-element-queries/src/ResizeSensor')

describe('SizeObservable', () => {
  const element = {
    clientHeight: 100,
    clientWidth: 100
  }
  let sizeObservable
  const observerSpy = jest.fn()
  let resize
  ResizeSensor.mockImplementation((element, callback) => {
    resize = callback
  })

  beforeEach(() => {
    sizeObservable = new SizeObservable(element)
    sizeObservable.register(observerSpy)
    observerSpy.mockReset()
  })

  it('notifies all observers on size resize', () => {
    resize()
    expect(observerSpy).toHaveBeenCalledWith({
      height: 100,
      width: 100
    })
  })

  it('allows to register multiple observers', () => {
    const anotherSpy = jest.fn()
    sizeObservable.register(anotherSpy)
    resize()
    expect(observerSpy).toHaveBeenCalledWith({
      height: 100,
      width: 100
    })
    expect(anotherSpy).toHaveBeenCalledWith({
      height: 100,
      width: 100
    })
  })

  it('allows to unregister observers', () => {
    sizeObservable.unregister(observerSpy)
    resize()
    expect(observerSpy).not.toHaveBeenCalledWith({
      height: 100,
      width: 100
    })
  })
})
