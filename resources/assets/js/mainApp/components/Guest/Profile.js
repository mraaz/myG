import React from 'react'
import { fetchProfile } from '../../../integration/http/guest'
import { ignoreFunctions } from '../../../common/render'
import GuestBanner from './Banner'
import ProfileInfo from '../Profile/Info'
import PostsFromUser from '../PostsFromUser'
import GameExperiences from '../Profile/GameExperiences'

export default class GuestProfile extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    loading: true,
    profile: null,
    showModal: false,
  }

  login = () => {
    window.location.href = '/'
  }

  componentDidMount() {
    fetchProfile(this.props.alias).then(({ profile }) => this.setState({ profile, loading: false }))
  }

  renderModal = () => {
    return (
      <div id="guest-modal" onClick={() => this.setState({ showModal: false })}>
        <div className="guest-modal-content">
          <span className="guest-modal-title">Create an account or login to continue</span>
          <div className='guest-button-container'>
            <div className='guest-button guest-green guest-join-label' onClick={(event) => { event.stopPropagation(); this.login(); }}>
              Join now
            </div>
            <div className='guest-button clickable' onClick={(event) => { event.stopPropagation(); this.login(); }}>
              <span>Sign in</span>
            </div>
          </div>
        </div>
      </div >
    );
  }

  render() {
    if (this.state.loading || !this.state.profile) return null
    return (
      <React.Fragment>
        {this.state.showModal && this.renderModal()}
        <div id='profile' className='guest-page' style={{ backgroundColor: '#000' }}>
          <GuestBanner />
          <div id='guest-content'>
            <span className='guest-alias'>@{this.props.alias}</span>
            <ProfileInfo alias={this.props.alias} profile={this.state.profile} />
            <GameExperiences alias={this.props.alias} profile={this.state.profile} />
            <div style={{ backgroundColor: '#1d2326' }} className="app-container home-page">
              <PostsFromUser onPostClick={() => this.setState({ showModal: true })} guest profile={this.state.profile} />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
