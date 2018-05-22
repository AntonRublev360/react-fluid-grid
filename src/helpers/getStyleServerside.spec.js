import getStyle from './getStyle'
import DEFAULT_STYLE from '../enums/defaultGridStyle'
jest.mock('detect-node', () => true)

describe('FluidGrid getStyle helper when run on server side', () => {
  const styleStrategies = [
    { mediaQuery: '(max-width: 300px)', style: {} }
  ]

  it('returns default style on server-side rendering', () => {
    const result = getStyle(styleStrategies)
    expect(result).toBe(DEFAULT_STYLE)
  })
})
