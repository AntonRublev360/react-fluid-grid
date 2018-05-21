import React from 'react'
import PropTypes from 'prop-types'
import SizeObservable from '../helpers/SizeObservable'

class ResizeObservingContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      height: null,
      width: null
    }
    this.container = React.createRef()
    this.createSizeObservable = this.createSizeObservable.bind(this)
    this.notifyHeightChange = this.notifyHeightChange.bind(this)
    this.notifyWidthChange = this.notifyWidthChange.bind(this)
    this.updateSize = this.updateSize.bind(this)
  }

  componentDidMount () {
    this.createSizeObservable(this.container.current)
  }

  notifyHeightChange ({ height }) {
    if (height !== this.state.height) {
      executeIfDefined(this.props.onHeightChange, height)
    }
  }

  notifyWidthChange ({ width }) {
    if (width !== this.state.width) {
      executeIfDefined(this.props.onWidthChange, width)
    }
  }

  updateSize (size) {
    this.setState(size)
  }

  createSizeObservable (element) {
    const sizeObservable = new SizeObservable(element)
    sizeObservable.register(this.notifyHeightChange)
    sizeObservable.register(this.notifyWidthChange)
    sizeObservable.register(this.updateSize)
  }

  render () {
    const {
      children
    } = this.props
    const passedProps = Object.assign({}, this.props)
    delete passedProps.onHeightChange
    delete passedProps.onWidthChange
    delete passedProps.children
    return (
      <div {...passedProps} ref={this.container}>
        {children}
      </div>
    )
  }
}

function executeIfDefined (func, ...params) {
  if (typeof func === 'function') {
    func(...params)
  }
}

ResizeObservingContainer.propTypes = {
  children: PropTypes.node,
  onHeightChange: PropTypes.func,
  onWidthChange: PropTypes.func
}

export default ResizeObservingContainer
