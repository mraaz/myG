import React from 'react'
import Uploader from './uploader'
import { ignoreFunctions } from '../../../../common/render'

export default class Background extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  onUpload = (source, key) => this.props.uploadProfileBackground(this.props.alias, source, key)

  renderBackground = () => {
    return (
      <div
        id='background'
        className={this.props.isSelf && 'clickable'}
        style={{
          backgroundImage: `url('${this.props.background}')`,
        }}
      />
    )
  }

  render() {
    if (this.props.isSelf) {
      return (
        <Uploader background onUpload={this.onUpload}>
          {this.renderBackground()}
        </Uploader>
      )
    }
    return this.renderBackground()
  }
}
