import React from 'react';

export default class AttachWindow extends React.PureComponent {

  render() {
    const showStyle = this.props.show ? 'chat-component-attach-window-showing' : '';
    return (
      <div className={`chat-component-attach-window ${showStyle}`}>
        <div
          className={`attach-icon clickable`}
          onClick={() => this.props.onEmoji('Hellow')}
          style={{ backgroundImage: `url(/assets/svg/ic_chat_action_emoji.svg)` }}
        />
        <div
          className={`attach-icon clickable`}
          onClick={() => this.props.onImage('Hellow')}
          style={{ backgroundImage: `url(/assets/svg/ic_chat_action_image.svg)` }}
        />
        <div
          className={`attach-icon clickable`}
          onClick={() => this.props.onVideo('Hellow')}
          style={{ backgroundImage: `url(/assets/svg/ic_chat_action_video.svg)` }}
        />
        <div
          className={`attach-icon clickable`}
          onClick={() => this.props.onSound('Hellow')}
          style={{ backgroundImage: `url(/assets/svg/ic_chat_action_sound.svg)` }}
        />
      </div>
    );
  }

}
