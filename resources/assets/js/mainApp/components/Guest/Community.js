import React from 'react'
import { fetchCommunity } from '../../../integration/http/guest'
import { ignoreFunctions } from '../../../common/render'
import GuestBanner from './Banner'
import SignUpModal from './SignUpModal'
import Group_IndividualPost from '../CommunityView/Group_IndividualPost'
import { copyToClipboard } from '../../../common/clipboard'
import { createShortLink } from '../../../integration/http/links'

export default class GuestCommunity extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    loading: true,
    community: null,
    showModal: false,
  }

  componentDidMount() {
    fetchCommunity(this.props.id).then((community) => this.setState({ community, loading: false }))
  }

  render() {
    if (this.state.loading || !this.state.community) return null
    return (
      <div id='community' className='guest-page' style={{ backgroundColor: '#000' }}>
        {this.state.showModal && <SignUpModal onClick={() => this.setState({ showModal: false })} />}
        <GuestBanner />
        <div id='guest-content' className='communityName__container'>
          <div className='guest-community-image' style={{ backgroundImage: `url(${this.state.community.group_img})` }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='guest-community-name'>{this.state.community.name}</div>
            <div className="share-community-button clickable" onClick={async () => copyToClipboard(await createShortLink(window.location.href))}>Share</div>
          </div>
          <div className='guest-community-description'>{this.state.community.grp_description}</div>
          <div className='guest-community-game'>Game - {this.state.community.game_name}</div>
          <div className='app-container home-page' style={{ background: 'unset', minHeight: 'unset' }}>
            <section id='posts' className='active'>
              {this.state.community.groupPosts.map((post, index) => {
                try {
                  post.media_url.length > 0 ? JSON.parse(post.media_url) : ''
                } catch (_) {
                  post.media_url = ''
                }
                return (
                  <div onClick={() => this.setState({ showModal: true })} key={index} >
                    <Group_IndividualPost guest post={post} user={{}} source={'news_feed'} />
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      </div>
    )
  }
}
