import React from 'react'
import { convertEmojisToColons } from '../../../common/emoji'
import { getAssetUrl } from '../../../common/assets'
import logger from '../../../common/logger'
import { ignoreFunctions } from '../../../common/render'

export default class ChatInput extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  constructor() {
    super()
    this.state = {
      input: '',
      isTyping: false,
      lastTyped: 0,
    }
    this.input = React.createRef()
  }

  componentDidMount() {
    this.input.current.focus()
  }

  componentDidUpdate() {
    if (this.props.replyingTo) this.input.current.focus()
  }

  static getDerivedStateFromProps(props, state) {
    if (props.selectedEmoji && props.selectedEmoji !== state.selectedEmoji) {
      return {
        input: state.input + props.selectedEmoji,
        selectedEmoji: props.selectedEmoji,
      }
    }
    return {
      selectedEmoji: props.selectedEmoji,
    }
  }

  onKeyPressed = (event) => {
    const code = event.keyCode || event.which
    const enterKeyCode = 13
    if (code === enterKeyCode) {
      event.preventDefault()
      this.sendMessage()
    }
  }

  onKeyDown = (event) => {
    const code = event.keyCode || event.which
    const arrowUpKeyCode = 38
    const selftDestructKeyCode = 83
    if (code === arrowUpKeyCode) {
      this.setState({ input: '' })
      this.props.editLastMessage()
    }
    if (code === selftDestructKeyCode && event.altKey) {
      this.props.toggleSelfDestruct()
    }
  }

  sendMessage = () => {
    if (!this.state.input.trim()) return
    this.props.sendMessage(convertEmojisToColons(this.state.input.trim()))
    this.props.setTyping(false)
    this.setState({ input: '' })
  }

  onTyping = (input) => {
    if (!this.state.isTyping) this.props.setTyping(true)
    this.setState({ input, isTyping: true, lastTyped: Date.now() })
    setTimeout(() => this.clearTyping(), 2000)
  }

  clearTyping = () => {
    if (!this.state.isTyping) return
    if (Date.now() - this.state.lastTyped < 1900) return
    this.props.setTyping(false)
    this.setState({ isTyping: false })
  }

  renderMessage = (content) => {
    if (!content) return null
    const isImage = content.includes('myg-image')
    const isSound = content.includes('myg-sound')
    const isVideo = content.includes('myg-video')
    if (isImage) return this.renderImage(content)
    if (isSound) return ' a sound file'
    if (isVideo) return ' a video file'
    return content
  }

  renderImage = (content) => {
    const image = content.split('myg-image|')[1]
    return (
      <div className='chat-component-message-image-container'>
        <div
          className={`chat-component-message-image clickable`}
          onClick={() => this.props.showAttachment({ image })}
          style={{ backgroundImage: `url('${image}')` }}
        />
      </div>
    )
  }

  render() {
    logger.log('RENDER', 'ChatInput')
    const disabled = !this.props.connected || !!this.props.blocked || !this.props.isDecryptable
    const placeholderText = !this.props.connected
      ? 'You seem to be offline...'
      : this.props.blocked
      ? 'Unblock to send messages'
      : 'Type your message here'
    return (
      <div className='chat-component-input-with-reply-container'>
        {this.props.replyingTo && <p className='chat-component-message-reply-no-margin'>replying to {this.renderMessage(this.props.replyingTo.content)}</p>}
        <div className='chat-component-input-container'>
          <textarea
            ref={this.input}
            rows={1}
            className='chat-component-input'
            disabled={disabled}
            placeholder={placeholderText}
            value={this.state.input}
            onChange={(event) => this.onTyping(event.target.value)}
            onKeyPress={this.onKeyPressed}
            onKeyDown={this.onKeyDown}
            onBlur={this.props.onBlur}></textarea>
          <div
            className='chat-component-send-button clickable'
            style={{ backgroundImage: `url(${getAssetUrl('ic_chat_send')})` }}
            onClick={() => !disabled && this.sendMessage()}
          />
        </div>
      </div>
    )
  }
}
