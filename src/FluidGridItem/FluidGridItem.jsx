import React from 'react'
import PropTypes from 'prop-types'
import ResizeObservingContainer from '../ResizeObservingContainer/ResizeObservingContainer'
import getItemStyles from '../helpers/getItemStyles'

function FluidGridItem ({
  children,
  className,
  columnWidth,
  gridWidth,
  gutterWidth,
  item,
  index,
  numberOfColumns,
  onHeightChange,
  registerItem,
  transition
}) {
  if (!children) {
    return null
  }
  const style = getItemStyles(item, {
    columnWidth,
    gridWidth,
    gutterWidth,
    numberOfColumns,
    transition
  })
  return (
    <div
      className={className}
      ref={registerItem}
      style={style}
    >
      <ResizeObservingContainer onHeightChange={onHeightChange}>
        {children}
      </ResizeObservingContainer>
    </div>
  )
}

FluidGridItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  columnWidth: PropTypes.number,
  gridWidth: PropTypes.number,
  gutterWidth: PropTypes.number,
  item: PropTypes.object,
  index: PropTypes.number.isRequired,
  numberOfColumns: PropTypes.number,
  onHeightChange: PropTypes.func.isRequired,
  registerItem: PropTypes.func.isRequired,
  transition: PropTypes.string
}

FluidGridItem.defaultProps = {
  className: '',
  transition: 'top 200ms ease-in-out, left 200ms ease-in-out, width 200ms ease-in-out'
}

export default FluidGridItem
