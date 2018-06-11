import getOuterGutterPortion from './getOuterGutterPortion'

const DEFAULT_ITEM_STYLES = {
  horizontalGutterShift: 0,
  left: 0,
  top: 0
}

export default function getItemStyles (item, dridStyles) {
  const mergedStyles = Object.assign({}, DEFAULT_ITEM_STYLES, item, dridStyles)
  mergedStyles.outerGutterPortion = getOuterGutterPortion(dridStyles.gutterWidth, dridStyles.numberOfColumns)
  return dridStyles.gridWidth
    ? getItemStylesForKnownWidth(mergedStyles)
    : getItemStylesForUnknownWidth(mergedStyles)
}

function getItemStylesForKnownWidth ({
  columnWidth,
  horizontalGutterShift,
  gridWidth,
  outerGutterPortion,
  gutterWidth,
  left,
  top,
  transition
}) {
  return {
    left: `${left * gridWidth / 100 + horizontalGutterShift}px`,
    position: 'absolute',
    top: `${top}px`,
    transition,
    width: `${gridWidth * columnWidth / 100 - gutterWidth + outerGutterPortion}px`
  }
}

function getItemStylesForUnknownWidth ({
  columnWidth,
  horizontalGutterShift,
  outerGutterPortion,
  gutterWidth,
  left,
  top,
  transition
}) {
  return {
    left: `calc(${left}% + ${horizontalGutterShift}px)`,
    position: 'absolute',
    top: `${top}px`,
    transition,
    width: `calc(${columnWidth}% - ${gutterWidth}px + ${outerGutterPortion}px)`
  }
}
