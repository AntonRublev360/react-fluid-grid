import ResizeSensor from 'css-element-queries/src/ResizeSensor'

export default class SizeObservable {
  constructor (element) {
    this.element = element
    this.observers = []
    this.handleResize = this.handleResize.bind(this)
    this.createSizeObservable()
  }

  register (observer) {
    this.observers.push(observer)
  }

  unregister (observerToUnregister) {
    this.observers = this.observers.filter((observer) => observer !== observerToUnregister)
  }

  handleResize () {
    const size = getSize(this.element)
    this.observers.forEach((observer) => observer(size))
  }

  createSizeObservable () {
    return new ResizeSensor(this.element, this.handleResize)
  }
}

function getSize (element) {
  return {
    height: element.clientHeight,
    width: element.clientWidth
  }
}
