import getColumnHeightShift from './getColumnHeightShift'

describe('FluidGrid getColumnHeightShift helper', () => {
  it('returns 0 if itemHeight is 0', () => {
    expect(getColumnHeightShift(0, 20)).toEqual(0)
  })

  it('returns sum of item and gutter heights if item height is not 0', () => {
    expect(getColumnHeightShift(11, 20)).toEqual(31)
  })
})
