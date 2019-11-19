import React from 'react'
import PropTypes from 'prop-types'
import ResizeObservingContainer from './ResizeObservingContainer/ResizeObservingContainer'
import getColumnWidth from './helpers/getColumnWidth'
import FluidGridItem from './FluidGridItem/FluidGridItem'
import getShortestColumn from './helpers/getShortestColumn'
import getLongestColumn from './helpers/getLongestColumn'
import getColumns from './helpers/getColumns'
import getColumnHeightShift from './helpers/getColumnHeightShift'
import defaultStyleStrategies from './enums/defaultStyleStrategies'
import getStyle from './helpers/getStyle'

class FluidGrid extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: {},
      height: '0px',
      overflow: 'hidden',
      position: 'relative'
    }
    this.items = {}
    this.updateLayout = this.updateLayout.bind(this)
    this.renderChild = this.renderChild.bind(this)
    this.pushToShortestColumn = this.pushToShortestColumn.bind(this)
    this.updateGridStyles = this.updateGridStyles.bind(this)
  }

  componentDidMount () {
    this.updateGridStyles()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.refreshRequired(prevProps, prevState)) {
      this.updateLayout()
    }
  }

  refreshRequired (prevProps, prevState) {
    return prevProps.children !== this.props.children ||
      prevState.numberOfColumns !== this.state.numberOfColumns ||
      prevState.gutterHeight !== this.state.gutterHeight ||
      prevState.gutterWidth !== this.state.gutterWidth
  }

  updateLayout () {
    this.initColumns()
    this.arrangeItems()
    this.setGridHeight()
    this.applyChanges()
  }

  initColumns () {
    const { columnWidth, gutterWidth, numberOfColumns } = this.state
    this.columns = getColumns(columnWidth, gutterWidth, numberOfColumns)
  }

  arrangeItems () {
    Object.values(this.items)
    .filter(({element}) => element)
    .forEach(this.pushToShortestColumn);
  }

  pushToShortestColumn (item) {
    const column = getShortestColumn(this.columns)
    this.setItemStyle(item, column)
    this.pushToColumn(item, column)
  }

  pushToColumn (item, column) {
    const { gutterHeight } = this.state
    const itemHeight = item.element.clientHeight
    const heightShift = getColumnHeightShift(itemHeight, gutterHeight)
    column.height = column.height + heightShift
  }

  setItemStyle (item, column) {
    item.top = column.height
    item.left = column.left
    item.horizontalGutterShift = column.horizontalGutterShift
  }

  setGridHeight () {
    const { gutterHeight } = this.state
    const { height } = getLongestColumn(this.columns)
    this.gridHeight = height - gutterHeight
  }

  applyChanges () {
    this.setState({
      height: `${this.gridHeight}px`,
      items: this.items
    })
  }

  updateGridStyles (gridWidth) {
    const {
      gutterHeight,
      gutterWidth,
      numberOfColumns
    } = getStyle(this.props.styleStrategies)
    const columnWidth = getColumnWidth(numberOfColumns)
    this.setState({
      columnWidth,
      gridWidth,
      gutterHeight,
      gutterWidth,
      numberOfColumns
    })
  }

  renderChildren () {
    this.clearItems()
    return this.props.children.map(this.renderChild)
  }

  clearItems () {
    this.items = {}
  }

  renderChild (child, index) {
    const { columnWidth, gridWidth, gutterWidth, items, numberOfColumns } = this.state
    const { itemClassName, transition } = this.props
    const registerItem = (element) => {
      this.items[index] = { element }
    }
    return (
      <FluidGridItem
        className={itemClassName}
        columnWidth={columnWidth}
        gridWidth={gridWidth}
        gutterWidth={gutterWidth}
        item={items[index]}
        index={index}
        key={index}
        numberOfColumns={numberOfColumns}
        onHeightChange={this.updateLayout}
        registerItem={registerItem}
        transition={transition}
      >
        {child}
      </FluidGridItem>
    )
  }

  render () {
    const { className } = this.props
    const {
      height,
      overflow,
      position
    } = this.state
    const style = {
      height,
      overflow,
      position
    }
    return (
      <div className={className} style={style}>
        <ResizeObservingContainer onWidthChange={this.updateGridStyles}>
          {this.renderChildren()}
        </ResizeObservingContainer>
      </div>
    )
  }
}

const styleStrategyShape = {
  mediaQuery: PropTypes.string.isRequired,
  style: PropTypes.shape({
    numberOfColumns: PropTypes.number.isRequired,
    gutterHeight: PropTypes.number.isRequired,
    gutterWidth: PropTypes.number.isRequired
  })
}

FluidGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  itemClassName: PropTypes.string,
  styleStrategies: PropTypes.arrayOf(PropTypes.shape(styleStrategyShape)),
  transition: PropTypes.string
}

FluidGrid.defaultProps = {
  className: '',
  itemClassName: '',
  styleStrategies: defaultStyleStrategies
}

export default FluidGrid
