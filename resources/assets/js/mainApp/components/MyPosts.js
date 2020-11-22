/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component, Fragment } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import IndividualPost from './IndividualPost'
import ComposeSection from './ComposeSection_v2'

export default class MyPosts extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      myPosts: [],
      moreplease: true,
      isFetching: false,
      post_submit_loading: false,
    }
  }

  componentDidMount() {
    window.scrollTo({
      top: 500,
      behavior: 'smooth',
    })
    this.fetchMoreData()
  }

  showLatestPosts = () => {
    const { myPosts = [] } = this.state
    if (myPosts.length > 0) {
      return myPosts.map((item, index) => {
        try {
          let media_url = item.media_url.length > 0 ? JSON.parse(item.media_url) : ''
        } catch (e) {
          item.media_url = ''
        }
        return <IndividualPost post={item} key={item.id} user={this.props.initialData.userInfo} />
      })
    }
  }

  fetchMoreData = (count) => {
    const { myPosts = [] } = this.state
    if (myPosts.length > 0) {
      window.scrollTo(0, document.documentElement.offsetHeight - 3000)
    }
    const getPosts = async () => {
      const { counter = '' } = this.state
      const self = this
      try {
        // const data = await axios.get(`/api/getmypost/${counter}`)

        const data = await axios({
          method: 'GET',
          url: `/api/getmypost/${counter}`,
          onDownloadProgress: (progressEvent) => {
            const { loaded = 0, total = 0 } = progressEvent
            const percentCompleted = Math.round((loaded * 100) / total)
            // self.setState({
            //   post_submit_loading: percentCompleted,
            // })
          },
        })
        if (data.data.myPosts.length == 0) {
          this.setState({
            myPosts: [...myPosts],
            moreplease: false,
            isFetching: false,
          })
          return
        }
        this.setState({
          myPosts: [...myPosts, ...data.data.myPosts],
          moreplease: data.data.myPosts.lastPage == counter ? false : true,
          isFetching: false,
        })
      } catch (error) {
        console.log(error)
      }
    }

    const myCounter = this.state.counter
    this.setState(
      {
        counter: count ? count : myCounter + 1,
        isFetching: true,
      },
      () => {
        getPosts()
      }
    )

    if (myCounter != 1) {
      this.setState({
        show_top_btn: true,
      })
    }
  }

  composeSuccess = async (data) => {
    const { myPosts = [] } = this.state
    this.setState(
      {
        post_submit_loading: true,
      },
      () => {
        this.setState({
          myPosts: [...data.data.myPosts, ...myPosts],
          moreplease: data.data.myPosts.lastPage == 1 ? false : true,
          post_submit_loading: false,
        })
      }
    )
  }

  render() {
    const { myPosts = [], moreplease, isFetching = false, post_submit_loading } = this.state
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
