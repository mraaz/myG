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
      post_submit_loading: 0,
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
        return <IndividualPost post={item} key={item.id} user={this.props.initialData} />
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
            self.setState({
              post_submit_loading: percentCompleted,
            })
          },
        })

        if (data.data.myPosts.data.length == 0) {
          this.setState({
            myPosts: [...myPosts],
            moreplease: false,
            isFetching: false,
          })
          return
        }
        this.setState({
          myPosts: [...myPosts, ...data.data.myPosts.data],
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

  composeSuccess = async () => {
    const { myPosts = [] } = this.state
    const self = this
    this.setState({
      isFetching: true,
    })
    const data = await axios({
      method: 'GET',
      url: '/api/getmypost/1',
      onDownloadProgress: (progressEvent) => {
        const { loaded = 0, total = 0 } = progressEvent
        const percentCompleted = Math.round((loaded * 100) / total)
        self.setState({
          post_submit_loading: percentCompleted,
        })
      },
    })
    // const data = await axios.get(`/api/getmypost/1`)
    if (data.data.myPosts.data.length == 0) {
      this.setState({
        myPosts: [...myPosts],
        moreplease: false,
        isFetching: false,
      })
    }
    this.setState({
      myPosts: [...data.data.myPosts.data],
      moreplease: data.data.myPosts.lastPage == 1 ? false : true,
      isFetching: false,
    })
  }

  render() {
    const { myPosts = [], moreplease, isFetching = false, post_submit_loading } = this.state
    return (
      <Fragment>
        <ComposeSection
          successCallback={this.composeSuccess}
          initialData={this.props.initialData == undefined ? 'loading' : this.props.initialData}
        />
        {isFetching && (
          <div class='timeline-item'>
            <div class='animated-background'>
              <div class='background-masker header-top'></div>
              <div class='background-masker header-left'></div>
              <div class='background-masker header-right'></div>
              <div class='background-masker header-bottom'></div>
              <div class='background-masker subheader-left'></div>
              <div class='background-masker subheader-right'></div>
              <div class='background-masker subheader-bottom'></div>
              <div class='background-masker content-top'></div>
              <div class='background-masker content-first-end'></div>
              <div class='background-masker content-second-line'></div>
              <div class='background-masker content-second-end'></div>
              <div class='background-masker content-third-line'></div>
              <div class='background-masker content-third-end'></div>
            </div>
          </div>
        )}
        {!isFetching && myPosts.length > 0 && (
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
