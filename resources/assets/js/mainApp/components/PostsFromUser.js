import React, { Component, Fragment } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import IndividualPost from './IndividualPost'
import { logToElasticsearch } from '../../integration/http/logger'

export default class PostsFromUser extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      myPosts: [],
      loadMore: true,
      isFetching: false,
    }
  }

  componentDidMount() {
    window.scrollTo({ top: 500, behavior: 'smooth' })
    this.fetchMoreData()
  }

  renderPost = (item) => {
    try {
      item.media_url.length > 0 ? JSON.parse(item.media_url) : ''
    } catch (e) {
      item.media_url = ''
    }
    return <IndividualPost post={item} key={item.id} user={this.props.profile} />
  }

  showLatestPosts = () => {
    if (this.state.myPosts.length) return this.state.myPosts.map(this.renderPost)
  }

  fetchMoreData = (count) => {
    const { myPosts = [] } = this.state
    if (myPosts.length > 0) window.scrollTo(0, document.documentElement.offsetHeight - 3000)
    const getPosts = async () => {
      const { counter = '' } = this.state
      try {
        console.log('fetchMoreData', this.props, this.state)
        const data = await axios({ method: 'GET', url: `/api/getuserposts/${this.props.profile.profileId}/${counter}` })
        if (data.data.myPosts.length == 0) return this.setState({ myPosts: [...myPosts], loadMore: false, isFetching: false })
        const loadMore = data.data.myPosts.lastPage == counter ? false : true
        this.setState({ loadMore, isFetching: false, myPosts: [...myPosts, ...data.data.myPosts] })
      } catch (error) {
        logToElasticsearch('error', 'MyPosts', 'fetchMoreData' + ' ' + error)
      }
    }
    const myCounter = this.state.counter
    this.setState({ counter: count ? count : myCounter + 1, isFetching: true }, getPosts)
    if (myCounter != 1) this.setState({ show_top_btn: true })
  }

  render() {
    const { myPosts = [], loadMore, isFetching = false } = this.state
    return (
      <Fragment>
        {myPosts.length > 0 && (
          <section id='posts' className={isFetching ? '' : `active`}>
            <InfiniteScroll dataLength={myPosts.length} next={this.fetchMoreData} hasMore={loadMore}>
              {this.showLatestPosts()}
            </InfiniteScroll>
          </section>
        )}
      </Fragment>
    )
  }
}
