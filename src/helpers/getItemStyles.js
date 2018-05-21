import getOuterGutterPortion from './getOuterGutterPortion'

const DEFAULT_ITEM_STYLES = {
  horizontalGutterShift: 0,
  left: 0,
  top: 0
}
export default function getItemStyles (item, {
  columnWidth,
  gridWidth,
  gutterWidth,
  numberOfColumns,
  transition
}) {
  const mergedStyles = Object.assign({}, DEFAULT_ITEM_STYLES, item)
  const outerGutterPortion = getOuterGutterPortion(gutterWidth, numberOfColumns)
  const left = gridWidth
    ? `${mergedStyles.left * gridWidth / 100 + mergedStyles.horizontalGutterShift}px`
    : `calc(${mergedStyles.left}% + ${mergedStyles.horizontalGutterShift}px)`
  return {
    left,
    position: 'absolute',
    top: `${mergedStyles.top}px`,
    transition,
    width: `calc(${columnWidth}% - ${gutterWidth}px + ${outerGutterPortion}px)`
  }
}
