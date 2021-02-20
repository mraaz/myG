import React, { Component, Fragment } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import IndividualPost from './IndividualPost'
import IndividualSponsoredPost from './IndividualSponsoredPost'
import ComposeSection from './ComposeSection_v2'
import GamerSuggestions from './Profile/GamerSuggestions'

import { logToElasticsearch } from '../../integration/http/logger'

export default class Posts extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      myPosts: [],
      moreplease: true,
      post_submit_loading: false,
    }
  }

  componentDidMount() {
    document.title = 'myG - Home'

    window.scrollTo({
      top: 500,
      behavior: 'smooth',
    })
    //window.history.pushState('myG', 'myG', '/')
    this.fetchMoreData()
  }

  showLatestPosts = () => {
    const { myPosts = [] } = this.state
    return myPosts.map(this.showthis_Post)
  }

  showthis_Post = (item, index) => {
    if (item == null) return
    const { sponsored_post = false } = item
    if (sponsored_post) {
      return <IndividualSponsoredPost post={item} key={index} source={'news_feed'} />
    } else {
      return <IndividualPost post={item} key={index} user={this.props.initialData.userInfo} source={'news_feed'} />
    }
  }

  fetchMoreData = () => {
    if (this.state.myPosts.length > 0) {
      window.scrollTo(0, document.documentElement.offsetHeight - 4000)
    }
    const self = this

    const getPosts = async function() {
      try {
        const myPosts = await axios({
          method: 'GET',
          url: `/api/post/${self.state.counter}`,
        })

        if (myPosts.data == '' || myPosts.data == {} || (myPosts.data.myPosts && myPosts.data.myPosts.length == 0)) {
          self.setState({
            moreplease: false,
          })
          return
        }

        if (myPosts.data.myPosts) {
          self.setState({
            myPosts: self.state.myPosts.concat(myPosts.data.myPosts),
          })
        } else {
          self.setState({
            moreplease: false,
          })
          return
        }
      } catch (error) {
        logToElasticsearch('error', 'Posts', 'Failed at myPosts' + ' ' + error)
      }
    }

    var myCounter = this.state.counter
    this.setState(
      {
        counter: this.state.counter + 1,
      },
      () => {
        getPosts()
      }
    )
  }

  composeSuccess = async (data) => {
    this.setState(
      {
        post_submit_loading: true,
      },
      () => {
        const { myPosts = [] } = this.state
        this.setState({
          myPosts: [...data.data.myPosts, ...myPosts],
          moreplease: data.data.myPosts.lastPage == 1 ? false : true,
          post_submit_loading: false,
        })
      }
    )
  }

  render() {
    const { myPosts = [], moreplease, isFetching = false, post_submit_loading = false } = this.state
    return (
      <Fragment>
        <ComposeSection
          successCallback={this.composeSuccess}
          initialData={this.props.initialData == undefined ? 'loading' : this.props.initialData}
        />
        {post_submit_loading && (
          <div className='timeline-item'>
            <div className='animated-background'>
              <div className='background-masker header-top'></div>
              <div className='background-masker header-left'></div>
              <div className='background-masker header-right'></div>
              <div className='background-masker header-bottom'></div>
              <div className='background-masker subheader-left'></div>
              <div className='background-masker subheader-right'></div>
              <div className='background-masker subheader-bottom'></div>
              <div className='background-masker content-top'></div>
              <div className='background-masker content-first-end'></div>
              <div className='background-masker content-second-line'></div>
              <div className='background-masker content-second-end'></div>
              <div className='background-masker content-third-line'></div>
              <div className='background-masker content-third-end'></div>
            </div>
          </div>
        )}
        <GamerSuggestions />
        {myPosts.length > 0 && !post_submit_loading && (
          <section id='posts' className={isFetching ? '' : `active`}>
            <InfiniteScroll dataLength={myPosts.length} next={this.fetchMoreData} hasMore={moreplease}>
              {this.showLatestPosts()}
            </InfiniteScroll>
          </section>
        )}
      </Fragment>
    )
  }
}
