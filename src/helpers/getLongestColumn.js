export default function getLongestColumn (columns) {
  const getLongest = (longestColumn, column, index) => longestColumn.height > column.height
    ? longestColumn
    : column
  return columns.reduce(getLongest, columns[0])
}
