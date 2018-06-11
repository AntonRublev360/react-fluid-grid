import getItemStyles from './getItemStyles'

describe('FluidGrid getItemStyles helper', () => {
  const itemStub = {
    horizontalGutterShift: 15,
    left: 50
  }
  const stylesStub = {
    columnWidth: 50,
    gutterWidth: 10,
    numberOfColumns: 2,
    transition: 'left 300ms ease-in'
  }

  it('returns item styles using calc() if grid width is unknown', () => {
    expect(getItemStyles(itemStub, stylesStub)).toEqual({
      left: 'calc(50% + 15px)',
      position: 'absolute',
      top: '0px',
      transition: 'left 300ms ease-in',
      width: 'calc(50% - 10px + 5px)'
    })
  })

  it('returns item styles avoiding calc()when gridWidth is known', () => {
    const stylesWithWidthStub = Object.assign({}, stylesStub, {
      gridWidth: 1000
    })
    expect(getItemStyles(itemStub, stylesWithWidthStub)).toEqual({
      left: '515px',
      position: 'absolute',
      top: '0px',
      transition: 'left 300ms ease-in',
      width: '495px'
    })
  })
})
