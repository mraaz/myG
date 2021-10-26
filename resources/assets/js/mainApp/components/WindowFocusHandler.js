import React from 'react'

export default class WindowFocusHandler extends React.Component {
  componentDidMount() {
    window.addEventListener('focus', this.onFocus)
    window.addEventListener('blur', this.onBlur)
  }

  componentWilUnmount() {
    window.removeEventListener('focus', this.onFocus)
    window.removeEventListener('blur', this.onBlur)
  }

  onFocus = () => {
    window.focused = true
    if (this.props.onFocus) this.props.onFocus()
  }

  onBlur = () => {
    window.focused = false
    if (this.props.onBlur) this.props.onBlur()
  }

  render() {
    return null
  }
}
