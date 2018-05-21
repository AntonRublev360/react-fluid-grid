export default [
  {
    mediaQuery: '(max-width: 719.9px)',
    style: { numberOfColumns: 1, gutterHeight: 8, gutterWidth: 8 }
  },
  {
    mediaQuery: '(min-width: 720px) and (max-width: 1023.9px)',
    style: { numberOfColumns: 2, gutterHeight: 16, gutterWidth: 16 }
  },
  {
    mediaQuery: '(min-width: 1024px) and (max-width: 1919.9px)',
    style: { numberOfColumns: 3, gutterHeight: 24, gutterWidth: 24 }
  },
  {
    mediaQuery: '(min-width: 1920px)',
    style: { numberOfColumns: 4, gutterHeight: 24, gutterWidth: 24 }
  }
]
