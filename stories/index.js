import React from 'react'
import { storiesOf } from '@storybook/react'
import FluidGrid from '../src/FluidGrid'
import ItemComponent from './assets/ItemComponent'
const styleStrategies = [
  { mediaQuery: '(max-width: 300px)', style: { numberOfColumns: 1, gutterHeight: 5, gutterWidth: 0 } },
  { mediaQuery: '(min-width: 301px) and (max-width: 600px)', style: { numberOfColumns: 2, gutterHeight: 15, gutterWidth: 15 } },
  { mediaQuery: '(min-width: 601px) and (max-width: 900px)', style: { numberOfColumns: 3, gutterHeight: 30, gutterWidth: 30 } },
  { mediaQuery: '(min-width: 901px) and (max-width: 1200px)', style: { numberOfColumns: 4, gutterHeight: 45, gutterWidth: 45 } },
  { mediaQuery: '(min-width: 1201px) and (max-width: 1500px)', style: { numberOfColumns: 5, gutterHeight: 60, gutterWidth: 60 } },
  { mediaQuery: '(min-width: 1501px)', style: { numberOfColumns: 6, gutterHeight: 75, gutterWidth: 75 } }
]

storiesOf('FluidGrid', module)
  .add('default', () => (
    <FluidGrid>
      <ItemComponent />
      <ItemComponent />
      <ItemComponent />
      <ItemComponent />
      <ItemComponent />
      <ItemComponent />
      <ItemComponent />
    </FluidGrid>
  ))
  .add('with custom styleStrategies', () => (
    <FluidGrid styleStrategies={styleStrategies}>
      <ItemComponent />
      <ItemComponent />
      <ItemComponent />
      <ItemComponent />
      <ItemComponent />
      <ItemComponent />
      <ItemComponent />
    </FluidGrid>
  ))
