import 'emoji-mart/css/emoji-mart.css'
import React from 'react'
import AttachUploader from './AttachUploader'
import { Picker } from 'emoji-mart'
import { getAssetUrl } from '../../../common/assets'
import { ignoreFunctions } from '../../../common/render'

export default class AttachWindow extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    choosingEmoji: false,
    choosingAttachment: false,
  }

  static getDerivedStateFromProps(props) {
    if (!props.show) {
      return {
        choosingEmoji: false,
        choosingAttachment: false,
      }
    }
    return null
  }

  onFinish = () => {
    this.setState({ choosingEmoji: false, choosingAttachment: false })
    this.props.onFinish()
  }

  renderEmojiPicker = () => {
    if (!this.props.show || !this.state.choosingEmoji) return null
    return (
      <Picker
        color='#2D363A'
        style={{
          position: 'absolute',
          bottom: '-70px',
          marginLeft: ' 20px',
          zIndex: 10,
        }}
        theme='dark'
        onSelect={this.props.onEmoji}
      />
    )
  }

  renderButtons = () => {
    if (this.state.choosingEmoji || this.state.choosingAttachment) return null
    return (
      <div className='buttons'>
        <div
          className={`attach-icon clickable`}
          onClick={() => this.setState({ choosingEmoji: true, choosingAttachment: false })}
          style={{ backgroundImage: `url(${getAssetUrl('ic_chat_action_emoji')})` }}
        />
        <div
          className={`attach-icon clickable`}
          onClick={() => this.setState({ choosingAttachment: true, choosingEmoji: false })}
          style={{ backgroundImage: `url(${getAssetUrl('ic_chat_action_image')})` }}
        />
      </div>
    )
  }

  renderUploader = () => {
    if (!this.state.choosingAttachment) return null
    return <AttachUploader sendMessage={this.props.sendMessage} onFinish={this.onFinish} />
  }

  render() {
    const showStyle = this.props.show ? 'chat-component-attach-window-showing' : ''
    return (
      <div className={`chat-component-attach-window ${showStyle}`}>
        {this.props.isGuest && <p className='chat-component-attach-window-members-only'>Sorry mate, members only.</p>}
        {!this.props.isGuest && this.renderEmojiPicker()}
        {!this.props.isGuest && this.renderButtons()}
        {!this.props.isGuest && this.renderUploader()}
      </div>
    )
  }
}
