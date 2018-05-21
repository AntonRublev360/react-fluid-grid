import getColumns from './getColumns'

describe('FluidGrid getColumns helper', () => {
  it('returns array of columns with styles', () => {
    const result = getColumns(25, 20, 4)
    expect(result).toEqual([
      {
        height: 0,
        horizontalGutterShift: 0,
        left: 0
      },
      {
        height: 0,
        horizontalGutterShift: 5,
        left: 25
      },
      {
        height: 0,
        horizontalGutterShift: 10,
        left: 50
      },
      {
        height: 0,
        horizontalGutterShift: 15,
        left: 75
      }
    ])
  })
})
