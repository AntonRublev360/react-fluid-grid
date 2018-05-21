import getShortestColumn from './getShortestColumn'

describe('FluidGrid getShortestColumn helper', () => {
  it('returns the shortest column', () => {
    const columns = [
      { height: 0 },
      { height: 200 },
      { height: 500 },
      { height: 300 },
      { height: 0 }
    ]
    expect(getShortestColumn(columns)).toEqual(columns[0])
  })
})
