import 'emoji-mart/css/emoji-mart.css'
import React from 'react';
import AttachUploader from './AttachUploader';
import { Picker } from 'emoji-mart'

export default class AttachWindow extends React.PureComponent {

  state = {
    choosingEmoji: false,
    choosingImage: false,
    choosingVideo: false,
    choosingSound: false,
  }

  static getDerivedStateFromProps(props) {
    if (!props.show) {
      return {
        choosingEmoji: false,
        choosingImage: false,
        choosingVideo: false,
        choosingSound: false,
      };
    }
    return null;
  }

  renderEmojiPicker = () => {
    if (!this.props.show || !this.state.choosingEmoji) return null;
    return <Picker
      color="#2D363A"
      style={{
        position: 'absolute',
        bottom: '-70px',
        marginLeft: ' 20px',
        zIndex: 10,
      }}
      theme="dark"
      onSelect={this.props.onEmoji}
    />
  }

  renderButtons = () => {
    if (this.state.choosingEmoji || this.state.choosingImage || this.state.choosingSound || this.state.choosingVideo) return null;
    return (
      <div className="buttons">
        <div
          className={`attach-icon clickable`}
          onClick={() => this.setState({ choosingEmoji: true, choosingImage: false, choosingSound: false, choosingVideo: false })}
          style={{ backgroundImage: `url(/assets/svg/ic_chat_action_emoji.svg)` }}
        />
        <div
          className={`attach-icon clickable`}
          onClick={() => this.setState({ choosingImage: true, choosingEmoji: false, choosingSound: false, choosingVideo: false })}
          style={{ backgroundImage: `url(/assets/svg/ic_chat_action_image.svg)` }}
        />
        <div
          className={`attach-icon clickable`}
          onClick={() => this.setState({ choosingVideo: true, choosingImage: false, choosingSound: false, choosingEmoji: false })}
          style={{ backgroundImage: `url(/assets/svg/ic_chat_action_video.svg)` }}
        />
        <div
          className={`attach-icon clickable`}
          onClick={() => this.setState({ choosingSound: true, choosingImage: false, choosingEmoji: false, choosingVideo: false })}
          style={{ backgroundImage: `url(/assets/svg/ic_chat_action_sound.svg)` }}
        />
      </div>
    );
  }

  renderUploader = () => {
    if (!this.state.choosingImage && !this.state.choosingSound && !this.state.choosingVideo) return null;
    return <AttachUploader sendMessage={this.props.sendMessage} onFinish={() => this.setState({ choosingEmoji: false, choosingImage: false, choosingSound: false, choosingVideo: false })} />
  }

  render() {
    const showStyle = this.props.show ? 'chat-component-attach-window-showing' : '';
    return (
      <div className={`chat-component-attach-window ${showStyle}`}>
        {this.renderEmojiPicker()}
        {this.renderButtons()}
        {this.renderUploader()}
      </div>
    );
  }

}
