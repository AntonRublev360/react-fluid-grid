export default function getColumnHeightShift (itemHeight, gutterHeight) {
  return itemHeight
    ? itemHeight + gutterHeight
    : 0
}
