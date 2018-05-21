import React from 'react'
import PropTypes from 'prop-types'
import ResizeObservingContainer from './ResizeObservingContainer/ResizeObservingContainer'
import getColumnWidth from './helpers/getColumnWidth'
import FluidGridItem from './FluidGridItem/FluidGridItem'
import getShortestColumn from './helpers/getShortestColumn'
import getLongestColumn from './helpers/getLongestColumn'
import getColumns from './helpers/getColumns'
import defaultStyleStrategies from './enums/defaultStyleStrategies'
import getStyle from './helpers/getStyle'

class FluidGrid extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: {},
      style: {
        height: '0px',
        position: 'relative'
      }
    }
    this.items = {}
    this.updateLayout = this.updateLayout.bind(this)
    this.renderChild = this.renderChild.bind(this)
    this.pushToShortestColumn = this.pushToShortestColumn.bind(this)
    this.updateGridStyles = this.updateGridStyles.bind(this)
  }

  static getDerivedStateFromProps (nextProps) {
    const {
      gutterHeight,
      gutterWidth,
      numberOfColumns
    } = getStyle(nextProps.styleStrategies)
    return Object.assign({}, {
      columnWidth: getColumnWidth(numberOfColumns),
      gutterHeight,
      gutterWidth,
      numberOfColumns
    })
  }

  componentDidMount () {
    this.updateLayout()
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
    Object.values(this.items).forEach(this.pushToShortestColumn)
  }

  pushToShortestColumn (item) {
    const column = getShortestColumn(this.columns)
    this.setItemStyle(item, column)
    this.pushToColumn(item, column)
  }

  pushToColumn (item, column) {
    const { gutterHeight } = this.state
    const itemHeight = item.element.clientHeight
    column.height = column.height + itemHeight + gutterHeight
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
      style: {
        height: `${this.gridHeight}px`,
        position: 'relative'
      },
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
    const { transition } = this.props
    const registerItem = (element) => {
      this.items[index] = { element }
    }
    return (
      <FluidGridItem
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
    const { style } = this.state
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
  styleStrategies: PropTypes.arrayOf(PropTypes.shape(styleStrategyShape)),
  transition: PropTypes.string
}

FluidGrid.defaultProps = {
  className: '',
  styleStrategies: defaultStyleStrategies
}

export default FluidGrid
