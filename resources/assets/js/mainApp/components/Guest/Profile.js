import React from 'react'
import { fetchProfile } from '../../../integration/http/guest'
import { getAssetUrl } from '../../../common/assets'
import { ignoreFunctions } from '../../../common/render'
import GuestBanner from './Banner';
import ProfileInfo from '../Profile/Info';
import GameExperiences from '../Profile/GameExperiences';

export default class GuestProfile extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    loading: true,
    profile: null,
  }

  componentDidMount() {
    fetchProfile(this.props.alias).then(({ profile }) => this.setState({ profile, loading: false }))
  }

  render() {
    if (this.state.loading || !this.state.profile) return null;
    return (
      <div id='profile' className="guest-page" style={{ backgroundImage: `url(${getAssetUrl('background_guest')})`}}>
        <GuestBanner />
        <div id="guest-content">
          <span className="guest-alias">@{this.props.alias}</span>
          <ProfileInfo alias={this.props.alias} profile={this.state.profile} />
          <GameExperiences alias={this.props.alias} profile={this.state.profile} />
        </div>
      </div >
    )
  }
}
