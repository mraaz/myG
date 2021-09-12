import React from 'react'

export default class Tooltip extends React.PureComponent {
  render() {
    const { show, position, text, extraClass } = this.props
    if (!show) return null
    return (
      <div className='tooltip-component'>
        <div className='container' style={position || {}}>
          {text.split('\n').map((text, index) => (
            <p key={index} className={extraClass}>
              {text}
            </p>
          ))}
        </div>
      </div>
    )
  }
}

export class WithTooltip extends React.PureComponent {
  state = {
    hovering: false
  }

  render() {
    if (this.props.disabled) return this.props.children
    const { style = {} } = this.props
    return (
      <div onMouseEnter={() => this.setState({ hovering: true })} onMouseLeave={() => this.setState({ hovering: false })} style={style}>
        {this.props.children}
        <Tooltip show={this.state.hovering} text={this.props.text} position={this.props.position} extraClass={this.props.extraClass} />
      </div>
    )
  }
}
