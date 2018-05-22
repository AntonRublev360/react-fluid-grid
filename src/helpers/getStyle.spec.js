import getStyle from './getStyle'
import DEFAULT_STYLE from '../enums/defaultGridStyle'
jest.mock('detect-node', () => false)

describe('FluidGrid getStyle helper', () => {
  let matchMedia
  const styleStrategies = [
    { mediaQuery: '(max-width: 300px)', style: {} }
  ]

  beforeAll(() => {
    matchMedia = global.matchMedia
  })

  afterAll(() => {
    global.matchMedia = matchMedia
  })

  it('returns style for the first matching mediaQuery', () => {
    global.matchMedia = () => ({ matches: true })
    const result = getStyle(styleStrategies)
    expect(result).toBe(styleStrategies[0].style)
  })

  it('returns default style for no matching mediaQueries', () => {
    global.matchMedia = () => ({ matches: false })
    const result = getStyle(styleStrategies)
    expect(result).toBe(DEFAULT_STYLE)
  })
})
