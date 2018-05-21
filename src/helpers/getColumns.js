const INITIAL_HEIGHT = 0
export default function getColumns (
  columnWidth,
  gutterWidth,
  numberOfColumns
) {
  const columns = []
  for (let i = 0; i < numberOfColumns; i++) {
    columns.push({
      height: INITIAL_HEIGHT,
      horizontalGutterShift: gutterWidth * i / numberOfColumns,
      left: columnWidth * i
    })
  }
  return columns
}
