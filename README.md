# react-fluid-grid
Responsive layout similar to pinterest. Items placed in columns according to their order and height.

[Live Demo](https://antonrublev360.github.io/react-fluid-grid)

# Installation
```
npm i --save react-fluid-grid
```

# Usage
Simply put components under FluidGrid component.
```js
import React from 'react'
import FluidGrid from 'react-fluid-grid'
import ItemComponent from './path/to/ItemComponent'

export default () => (
  <FluidGrid>
    <ItemComponent />
    <ItemComponent />
    <ItemComponent />
    <div>
      <h1>{'Any node'}</h1>
    </div>
  </FluidGrid>
)
```

Example with optional props:
```js
import React from 'react'
import FluidGrid from 'react-fluid-grid'
import ItemComponent from './path/to/ItemComponent'
const styleStrategies = [
  { mediaQuery: '(max-width: 719.9px)', style: { numberOfColumns: 1, gutterHeight: 5, gutterWidth: 0 } },
  { mediaQuery: '(min-width: 720px) and (max-width: 1023.9px)', style: { numberOfColumns: 2, gutterHeight: 15, gutterWidth: 15 } },
  { mediaQuery: '(min-width: 1024px)', style: { numberOfColumns: 3, gutterHeight: 30, gutterWidth: 30 } }
]
const transition = 'top 100ms ease-in-out, left 100ms ease-in-out'

export default () => (
  <FluidGrid
    className='my-grid'
    itemClassName='my-grid-item'
    styleStrategies={styleStrategies}
    transition={transition}
  >
    <ItemComponent />
    <ItemComponent />
    <ItemComponent />
    <div>
      <h1>{'Any node'}</h1>
    </div>
  </FluidGrid>
)
```

# Props

## className
Optional. Class name that will be assigned to the grid's containing div element.

## itemClassName
Optional. Class name that will be assigned to the grid items' containing div elements.

## styleStrategies
Optional. An array of styleStrategies that allows to control number of columns and gutter sizes in a responsive way.

Shape:
```js
styleStrategies: PropTypes.arrayOf(PropTypes.shape({
  mediaQuery: PropTypes.string.isRequired,
  style: PropTypes.shape({
    numberOfColumns: PropTypes.number.isRequired,
    gutterHeight: PropTypes.number.isRequired,
    gutterWidth: PropTypes.number.isRequired
  })
}))
```

### mediaQuery
A string containing media query. For example: `(min-width: 720px) and (max-width: 1023.9px)`. `style` of the first matching `mediaQuery` is applied to the grid.

### style
An object that defines grid style for a given media. Must have following attributes:
- numberOfColumns: number
- gutterHeight: number, gutter height in pixels
- gutterWidth: number, gutter width in pixels

## transition
Optional. css transition property value. Defaut: `top 200ms ease-in-out, left 200ms ease-in-out`.

# Maintainers
[AntonRublev360](https://github.com/AntonRublev360)
