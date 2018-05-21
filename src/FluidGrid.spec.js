import React from 'react'
import { shallow } from 'enzyme'
import FluidGrid from './FluidGrid'
import FluidGridItem from './FluidGridItem/FluidGridItem'
import getStyle from './helpers/getStyle'
jest.mock('./helpers/getStyle')

describe('FluidGrid', () => {
  let rendered, instance, updateLayoutSpy

  beforeEach(() => {
    getStyle.mockReturnValue({
      gutterHeight: 0,
      gutterWidth: 0,
      numberOfColumns: 2
    })
    rendered = shallow(
      <FluidGrid className='fluid-grid'>
        <div style={{ height: 300 }} />
        <div style={{ height: 100 }} />
        <div style={{ height: 100 }} />
        <div style={{ height: 100 }} />
        <div style={{ height: 100 }} />
      </FluidGrid>
    )
    instance = rendered.instance()
    updateLayoutSpy = jest.spyOn(instance, 'updateLayout')
  })

  it('renders', () => {
    expect(rendered.find('.fluid-grid')).toHaveLength(1)
  })

  it('updates grid layout once mounted', () => {
    instance.componentDidMount()
    expect(updateLayoutSpy).toHaveBeenCalled()
  })

  it('calculates styles state when grid width changes', () => {
    getStyle.mockReturnValue({
      gutterHeight: 10,
      gutterWidth: 10,
      numberOfColumns: 3
    })
    instance.updateGridStyles()
    expect(instance.state).toMatchObject({
      columnWidth: 33.33,
      gutterHeight: 10,
      gutterWidth: 10,
      numberOfColumns: 3
    })
  })

  describe('getDerivedStateFromProps', () => {
    const nextPropsStub = {
      styleStrategies: []
    }
    let newState

    beforeEach(() => {
      newState = FluidGrid.getDerivedStateFromProps(nextPropsStub)
    })

    it('derives styles from from styleStrategies', () => {
      expect(getStyle).toHaveBeenCalledWith(nextPropsStub.styleStrategies)
    })

    it('calculates styles state when props change', () => {
      expect(newState).toEqual({
        columnWidth: 50,
        gutterHeight: 0,
        gutterWidth: 0,
        numberOfColumns: 2
      })
    })
  })

  describe('when component is updated', () => {
    it('updates grid layout if children changed', () => {
      const prevPropsStub = Object.assign({}, instance.props, {
        children: []
      })
      const prevStateStub = instance.state
      instance.componentDidUpdate(prevPropsStub, prevStateStub)
      expect(updateLayoutSpy).toHaveBeenCalled()
    })

    it('updates grid layout if numberOfColumns changed', () => {
      const prevPropsStub = instance.props
      const prevStateStub = Object.assign({}, instance.state, {
        numberOfColumns: 3
      })
      instance.componentDidUpdate(prevPropsStub, prevStateStub)
      expect(updateLayoutSpy).toHaveBeenCalled()
    })

    it('updates grid layout if gutterHeight changed', () => {
      const prevPropsStub = instance.props
      const prevStateStub = Object.assign({}, instance.state, {
        gutterHeight: 20
      })
      instance.componentDidUpdate(prevPropsStub, prevStateStub)
      expect(updateLayoutSpy).toHaveBeenCalled()
    })

    it('updates grid layout if gutterWidth changed', () => {
      const prevPropsStub = instance.props
      const prevStateStub = Object.assign({}, instance.state, {
        gutterWidth: 20
      })
      instance.componentDidUpdate(prevPropsStub, prevStateStub)
      expect(updateLayoutSpy).toHaveBeenCalled()
    })

    it('does not update grid layout otherwise', () => {
      const prevPropsStub = instance.props
      const prevStateStub = instance.state
      instance.componentDidUpdate(prevPropsStub, prevStateStub)
      expect(updateLayoutSpy).not.toHaveBeenCalled()
    })
  })

  describe('updateLayout', () => {
    beforeEach(() => {
      const items = rendered.find(FluidGridItem)
      items.forEach((item) => {
        const child = item.find('div').at(0).props()
        item.props().registerItem({ clientHeight: child.style.height })
      })
    })

    it('updates grid height', () => {
      instance.updateLayout()
      expect(instance.state).toHaveProperty('style', {
        height: '400px',
        position: 'relative'
      })
    })

    it('updates grid layout', () => {
      const expectedItems = {
        '0': {
          element: expect.anything(),
          top: 0,
          left: 0,
          horizontalGutterShift: 0
        },
        '1': {
          element: expect.anything(),
          top: 0,
          left: 50,
          horizontalGutterShift: 0
        },
        '2': {
          element: expect.anything(),
          top: 100,
          left: 50,
          horizontalGutterShift: 0
        },
        '3': {
          element: expect.anything(),
          top: 200,
          left: 50,
          horizontalGutterShift: 0
        },
        '4': {
          element: expect.anything(),
          top: 300,
          left: 0,
          horizontalGutterShift: 0
        }
      }
      instance.updateLayout()
      expect(instance.state).toHaveProperty('items', expectedItems)
    })
  })
})
