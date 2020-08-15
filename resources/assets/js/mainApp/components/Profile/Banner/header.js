import React from 'react'
import { ignoreFunctions } from '../../../../common/render'

export default class Header extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  render() {
    return (
      <div id='header'>
        <div className='info'>
          <div
            className='icon clickable'
            style={{ backgroundImage: `url('${this.props.profile.image}')` }}
          />
          <div className={`status-${this.props.profile.status}`} />
          <span className='handle'>@{this.props.profile.alias}</span>
        </div>

        <div className='buttons'>
          <div className='button clickable'>Request Connection</div>
          <div className='send-message-button clickable'>
            <div
              className='send-message-button-icon'
              style={{
                backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/logo.svg')`,
                backgroundSize: 'inherit',
                backgroundColor: '#000',
              }}
            />
            Send Message
          </div>
          <div className='button clickable'>Follow</div>
          <div className='button clickable'>View Friends</div>
          <div className='button clickable'>Social Hub</div>
        </div>
      </div>
    )
  }
}
