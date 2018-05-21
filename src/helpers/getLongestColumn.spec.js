import getLongestColumn from './getLongestColumn'

describe('FluidGrid getLongestColumn helper', () => {
  it('returns the longest column', () => {
    const columns = [
      { height: 0 },
      { height: 200 },
      { height: 500 },
      { height: 300 },
      { height: 500 }
    ]
    expect(getLongestColumn(columns)).toEqual(columns[2])
  })
})
