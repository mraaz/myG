import React from 'react'
import { fetchProfile } from '../../../integration/http/guest'
import { ignoreFunctions } from '../../../common/render'
import GuestBanner from './Banner'
import SignUpModal from './SignUpModal'
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

  componentDidMount() {
    fetchProfile(this.props.alias).then(({ profile }) => this.setState({ profile, loading: false }))
  }
  handleGuestModal = ()=>{
    this.setState({showModal:!this.state.showModal})
  }

  render() {
    if (this.state.loading || !this.state.profile) return null
    return (
      <React.Fragment>
        {this.state.showModal && <SignUpModal  handleGuestModal={this.handleGuestModal} onClick={() => this.setState({ showModal: false })}  />}
        <div id='profile' className='guest-page' style={{ backgroundColor: '#000' }}>
          <GuestBanner  handleGuestModal={this.handleGuestModal} />
          <div id='guest-content'>
            <span className='guest-alias'>@{this.props.alias}</span>
            <ProfileInfo alias={this.props.alias} profile={this.state.profile} />
            <GameExperiences alias={this.props.alias} profile={this.state.profile} />
            <div style={{ backgroundColor: '#1d2326' }} className="app-container home-page">
              <PostsFromUser handleGuestModal={this.handleGuestModal} guest profile={this.state.profile} />
            </div>
          </div>
          {this.state.showModal &&<div className="login__backdrop" onClick={this.handleGuestModal}></div>}
        </div>
      </React.Fragment>
    )
  }
}
