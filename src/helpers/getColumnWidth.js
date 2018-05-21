import getSafeNumberOfColumns from './getSafeNumberOfColumns'
import round from './round'
const WIDTH_PRECISION = 2

export default function getColumnWidth (numberOfColumns) {
  const safeNumberOfColumns = getSafeNumberOfColumns(numberOfColumns)
  const width = 100 / safeNumberOfColumns
  return round(width, WIDTH_PRECISION)
}
