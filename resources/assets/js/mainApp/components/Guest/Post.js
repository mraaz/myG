import React from 'react'
import { getAssetUrl } from '../../../common/assets'
import { ignoreFunctions } from '../../../common/render'
import GuestBanner from './Banner';

export default class GuestPost extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  render() {
    return (
      <div id='post' className="guest-page" style={{ backgroundImage: `url(${getAssetUrl('background_guest')})` }}>
        <GuestBanner />
        <div id="guest-content">
          Nothing
        </div>
      </div >
    )
  }
}
