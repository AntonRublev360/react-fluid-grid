import getSafeNumberOfColumns from './getSafeNumberOfColumns'
export default function getOuterGutterPortion (gutterWidth, numberOfColumns) {
  const safeNumberOfColumns = getSafeNumberOfColumns(numberOfColumns)
  return gutterWidth / safeNumberOfColumns
}
