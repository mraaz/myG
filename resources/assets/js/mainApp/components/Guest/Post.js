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

  handleShowModal = ()=>{
    this.setState({showModal:!this.state.showModal})
  }

  render() {
    if (this.state.loading || !this.state.post) return null
    return (
      <div id='post' className='guest-page active' style={{ backgroundColor: '#000' }}>
        <GuestBanner handleShowModal={this.handleShowModal} />
        {this.state.showModal && <SignUpModal  handleShowModal={this.handleShowModal} onClick={() => this.setState({ showModal: false })} />}
        <div id='guest-content' className='app-container home-page'>
          <section id='posts' className='active' onClick={() => this.setState({ showModal: true })}>
            <IndividualPost guest post={this.state.post} user={{}} source={'news_feed'} />
          </section>
        </div>
        {this.state.showModal &&<div className="login__backdrop" onClick={this.handleShowModal}></div>}
      </div>
    )
  }
}
