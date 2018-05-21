import getOuterGutterPortion from './getOuterGutterPortion'

describe('FluidGrid getOuterGutterPortion helper', () => {
  it('returns shift due to no outer gutter per column', () => {
    const result = getOuterGutterPortion(40, 4)
    expect(result).toEqual(10)
  })
})
