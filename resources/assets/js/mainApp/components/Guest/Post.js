import React from 'react'
import { fetchPost } from '../../../integration/http/guest'
import { getAssetUrl } from '../../../common/assets'
import { ignoreFunctions } from '../../../common/render'
import GuestBanner from './Banner';
import IndividualPost from '../IndividualPost';

export default class GuestPost extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    loading: true,
    post: null,
  }

  componentDidMount() {
    fetchPost(this.props.id).then((post) => this.setState({ post, loading: false }))
  }

  render() {
    if (this.state.loading || !this.state.post) return null;
    return (
      <div id='post' className="guest-page active" style={{ backgroundImage: `url(${getAssetUrl('background_guest')})` }}>
        <GuestBanner />
        <div id="guest-content" className="app-container home-page">
          <section id='posts' className="active">
            <IndividualPost guest post={this.state.post} user={{}} source={'news_feed'} />
          </section>
        </div>
      </div>
    )
  }
}
