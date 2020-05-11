import React, { Component, Fragment } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import IndividualPost from './IndividualPost'
import ComposeSection from './ComposeSection_v2'

export default class Posts extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      myPosts: [],
      moreplease: true,
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
    if (this.state.myPosts != undefined) {
      return this.state.myPosts.map((item, index) => {
        return <IndividualPost post={item} key={index} user={this.props.initialData} source={'news_feed'} />
      })
    }
  }

  fetchMoreData = () => {
    if (this.state.myPosts.length > 0) {
      window.scrollTo(0, document.documentElement.offsetHeight - 4000)
    }
    const self = this

    const getPosts = async function () {
      const self = this
      try {
        // const myPosts = await axios.get(`/api/post/${self.state.counter}`)

        const myPosts = await axios({
          method: 'GET',
          url: `/api/post/${self.state.counter}`,
          onDownloadProgress: (progressEvent) => {
            const { loaded = 0, total = 0 } = progressEvent
            const percentCompleted = Math.round((loaded * 100) / total)
            self.setState({
              post_submit_loading: percentCompleted,
            })
          },
        })

        if (myPosts.data.myPosts.length == 0) {
          self.setState({
            moreplease: false,
          })
          return
        }

        self.setState({
          myPosts: self.state.myPosts.concat(myPosts.data.myPosts),
        })
      } catch (error) {
        console.log(error)
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
      url: '/api/post/1',
      onDownloadProgress: (progressEvent) => {
        const { loaded = 0, total = 0 } = progressEvent
        const percentCompleted = Math.round((loaded * 100) / total)
        self.setState({
          post_submit_loading: percentCompleted,
        })
      },
    })

    // const data = await axios.get(`/api/post/1`)
    if (data.data.myPosts.length == 0) {
      this.setState({
        myPosts: [...myPosts],
        moreplease: false,
        isFetching: false,
      })
    }
    this.setState({
      myPosts: [...data.data.myPosts],
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
