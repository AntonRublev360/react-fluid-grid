import round from './round'

describe('FluidGrid round helper', () => {
  it('rounds to decimal places', () => {
    expect(round(100 / 3, 2)).toEqual(33.33)
  })
})
