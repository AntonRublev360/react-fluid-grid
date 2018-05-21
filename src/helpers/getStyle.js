import DEFAULT_STYLE from '../enums/defaultGridStyle'

export default function getStyle (styleStrategies) {
  const matchingStrategy = styleStrategies.find(isMatch)
  return matchingStrategy ? matchingStrategy.style : DEFAULT_STYLE
}

function isMatch ({ mediaQuery }) {
  return window.matchMedia(mediaQuery).matches
}
