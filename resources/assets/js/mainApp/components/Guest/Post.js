import React from 'react'
import { fetchPost } from '../../../integration/http/guest'
import { ignoreFunctions } from '../../../common/render'
import GuestBanner from './Banner'
import SignUpModal from './SignUpModal'
import IndividualPost from '../IndividualPost'

export default class GuestPost extends React.Component {
  


  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }
  state = {
    loading: true,
    post: null,
    showModal: false,
  }
  

  componentDidMount() {
    fetchPost(this.props.id).then((post) => this.setState({ post, loading: false }))
  }

  handleGuestModal = ()=>{
    this.setState({showModal:!this.state.showModal})
  }

  render() {
    if (this.state.loading || !this.state.post) return null
    return (
      <div id='post' className='guest-page active' style={{ backgroundColor: '#000' }}>
        <GuestBanner handleGuestModal={this.handleGuestModal} />
        {this.state.showModal && <SignUpModal  handleGuestModal={this.handleGuestModal} onClick={() => this.setState({ showModal: false })} />}
        <div id='guest-content' className='app-container home-page'  >
          <section id='posts' className='active' >
            <IndividualPost refreshme={this.props.refreshme} guest post={this.state.post} handleGuestModal={this.handleGuestModal} user={{}} source={'news_feed'} />
          </section>
        </div>
      </div>
    )
  }
}
