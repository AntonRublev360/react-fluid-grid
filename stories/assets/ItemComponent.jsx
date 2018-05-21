import React from 'react'
const itemStyle = {
  border: '1px solid black',
  overflow: 'hidden',
  padding: '20px'
}

export default class ItemComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState((prevState) => ({
      expanded: !prevState.expanded
    }))
  }

  render () {
    const extraStuff = (
      <section>
        <hr />
        <p>
          {'Items are placed one by one each in a column with smallest height at that time.'}
        </p>
        <p>
          {'As item\'s size changes, grid layout is automatically updated.'}
        </p>
        <p>
          {'Number of columns and gutter sizes can be configured for different screens with media queries'}
        </p>
      </section>
    )
    return (
      <div
        className='fluid-grid-example__item-component'
        style={itemStyle}
      >
        <h1>{'Item Component'}</h1>
        <p>{'Click button below to change item height'}</p>
        <button onClick={this.toggle}>
          {'Toggle'}
        </button>
        {this.state.expanded && extraStuff}
      </div>
    )
  }
}
