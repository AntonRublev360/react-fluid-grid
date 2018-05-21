import getColumnWidth from './getColumnWidth'

describe('FluidGrid getColumnWidth helper', () => {
  it('returns 100 on 1', () => {
    expect(getColumnWidth(1)).toEqual(100)
  })

  it('returns 50 on 2', () => {
    expect(getColumnWidth(2)).toEqual(50)
  })

  it('returns 16.67 on 6', () => {
    expect(getColumnWidth(6)).toEqual(16.67)
  })
})
