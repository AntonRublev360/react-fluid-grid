export default function getSafeNumberOfColumns (numberOfColumns) {
  return numberOfColumns > 0
    ? numberOfColumns
    : 1
}
