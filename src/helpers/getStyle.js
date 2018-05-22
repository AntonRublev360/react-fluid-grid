import DEFAULT_STYLE from '../enums/defaultGridStyle'
import isNode from 'detect-node'

export default function getStyle (styleStrategies) {
  if (isNode) {
    return DEFAULT_STYLE
  }
  const matchingStrategy = styleStrategies.find(isMatch)
  return matchingStrategy ? matchingStrategy.style : DEFAULT_STYLE
}

function isMatch ({ mediaQuery }) {
  return window.matchMedia(mediaQuery).matches
}
