import React from 'react'
import { shallow } from 'enzyme'
import FluidGridItem from './FluidGridItem'

describe('FluidGridItem', () => {
  const item = {
    horizontalGutterShift: 0,
    left: 0,
    top: 0
  }
  const commonProps = {
    columnWidth: 50,
    gutterWidth: 20,
    item,
    index: 0,
    numberOfColumns: 2,
    onHeightChange: jest.fn(),
    registerItem: jest.fn(),
    transition: 'top 300ms ease-in'
  }
  let rendered

  describe('with no children', () => {
    it('does not render', () => {
      rendered = shallow(<FluidGridItem
        {...commonProps}
      />)
      expect(rendered.isEmptyRender()).toBeTruthy()
    })
  })

  describe('with child node', () => {
    beforeEach(() => {
      rendered = shallow(
        <FluidGridItem {...commonProps}>
          <div />
        </FluidGridItem>
      )
    })

    it('renders', () => {
      expect(rendered.isEmptyRender()).toBeFalsy()
    })

    it('assigns styles', () => {
      const item = rendered.at(0).props()
      expect(item).toHaveProperty('style', {
        left: 'calc(0% + 0px)',
        position: 'absolute',
        top: '0px',
        transition: 'top 300ms ease-in',
        width: 'calc(50% - 20px + 10px)'
      })
    })
  })
})
