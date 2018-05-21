import getItemStyles from './getItemStyles'

describe('FluidGrid getItemStyles helper', () => {
  const itemStub = {
    horizontalGutterShift: 15,
    left: 50
  }
  const paramsStub = {
    columnWidth: 50,
    gutterWidth: 10,
    numberOfColumns: 2,
    transition: 'left 300ms ease-in'
  }

  it('returns item styles', () => {
    expect(getItemStyles(itemStub, paramsStub)).toEqual({
      left: 'calc(50% + 15px)',
      position: 'absolute',
      top: '0px',
      transition: 'left 300ms ease-in',
      width: 'calc(50% - 10px + 5px)'
    })
  })

  it('sets left property in px if gridWidth is known', () => {
    const paramsWithWidthStub = Object.assign({}, paramsStub, {
      gridWidth: 1000
    })
    expect(getItemStyles(itemStub, paramsWithWidthStub)).toEqual({
      left: '515px',
      position: 'absolute',
      top: '0px',
      transition: 'left 300ms ease-in',
      width: 'calc(50% - 10px + 5px)'
    })
  })
})
