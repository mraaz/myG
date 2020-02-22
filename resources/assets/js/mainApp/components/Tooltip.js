import React from 'react';


export default class Tooltip extends React.PureComponent {
  render() {
    const {
      show,
      position,
      text,
    } = this.props;
    if (!show) return null;
    return (
      <div className="tooltip-component">
        <div className="container" style={position || {}}>
          {text.split('\n').map((text, index) => <p key={index}>{text}</p>)}
        </div>
      </div>
    );
  }
}

export class WithTooltip extends React.PureComponent {

  state = {
    hovering: false,
  }

  render() {
    return (
      <div
        onMouseEnter={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
      >
        {this.props.children}
        <Tooltip show={this.state.hovering} text={this.props.text} position={this.props.position} />
      </div>
    );
  }

}