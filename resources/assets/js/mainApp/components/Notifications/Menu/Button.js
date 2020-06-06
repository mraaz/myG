import React, { Component } from 'react'

export default class Button extends Component {
  constructor() {
    super()
  }

  render() {
    const { title, active } = this.props;

    const isActive = active == false ? '' : 'active';

    return (
      <button
        className={'button ' + isActive}
        onClick={this.props.onClick}
      >
        {title}
      </button>
    );
  }
}