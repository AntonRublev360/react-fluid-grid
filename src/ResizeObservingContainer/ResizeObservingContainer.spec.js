import ResizeObservingContainer from './ResizeObservingContainer'
import React from 'react'
import { shallow } from 'enzyme'
import SizeObservable from '../helpers/SizeObservable'
jest.mock('../helpers/SizeObservable')

describe('ResizeObservingContainer', () => {
  let rendered, instance
  const props = {
    onHeightChange: jest.fn(),
    onWidthChange: jest.fn()
  }
  const sizeObservableMock = {
    register: jest.fn()
  }
  SizeObservable.mockImplementation(() => sizeObservableMock)

  beforeEach(() => {
    rendered = shallow(<ResizeObservingContainer
      {...props}
    />)
    sizeObservableMock.register.mockReset()
    props.onWidthChange.mockReset()
    props.onHeightChange.mockReset()
    instance = rendered.instance()
  })

  it('monitors size changes once mounted', () => {
    instance.componentDidMount()
    expect(sizeObservableMock.register).toHaveBeenCalledTimes(3)
  })

  it('calls onWidthChange on width change', () => {
    instance.notifyWidthChange({ width: 100 })
    expect(props.onWidthChange).toHaveBeenCalledWith(100)
  })

  it('calls onHeightChange on height change', () => {
    instance.notifyHeightChange({ height: 100 })
    expect(props.onHeightChange).toHaveBeenCalledWith(100)
  })

  it('does not call onWidthChange if width did not change', () => {
    instance.updateSize({
      width: 100
    })
    instance.notifyWidthChange({ width: 100 })
    expect(props.onWidthChange).not.toHaveBeenCalled()
  })

  it('does not call onHeightChange if height did not change', () => {
    instance.updateSize({
      height: 100
    })
    instance.notifyHeightChange({ height: 100 })
    expect(props.onHeightChange).not.toHaveBeenCalled()
  })

  describe('when onHeightChange and onWidthChange are undefined', () => {
    beforeEach(() => {
      rendered = shallow(<ResizeObservingContainer />)
      instance = rendered.instance()
    })

    it('does not throw if onHeightChange is undefined', () => {
      expect(() => {
        instance.notifyHeightChange({ height: 100 })
      }).not.toThrow()
    })

    it('does not throw if onWidthChange is undefined', () => {
      expect(() => {
        instance.notifyWidthChange({ width: 100 })
      }).not.toThrow()
    })
  })
})
