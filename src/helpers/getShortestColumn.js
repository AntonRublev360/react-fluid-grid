export default function getShortestColumn (columns) {
  const getShortest = (shortestColumn, column, index) => shortestColumn.height <= column.height
    ? shortestColumn
    : column
  return columns.reduce(getShortest, columns[0])
}
