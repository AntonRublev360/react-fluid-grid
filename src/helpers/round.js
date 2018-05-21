export default function round (value, decimals) {
  const decimalsShift = Math.pow(10, decimals)
  return Math.round(value * decimalsShift) / decimalsShift
}
