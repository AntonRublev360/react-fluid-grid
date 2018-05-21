import getSafeNumberOfColumns from './getSafeNumberOfColumns'

describe('FluidGrid getSafeNumberOfColumns helper', () => {
  it('returns 2 on 2', () => {
    expect(getSafeNumberOfColumns(2)).toEqual(2)
  })

  it('returns 1 on 0', () => {
    expect(getSafeNumberOfColumns(0)).toEqual(1)
  })

  it('returns 1 on -2', () => {
    expect(getSafeNumberOfColumns(-2)).toEqual(1)
  })

  it('returns 1 on 1', () => {
    expect(getSafeNumberOfColumns(1)).toEqual(1)
  })
})
