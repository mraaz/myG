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
      try {
        const data = await axios.get(`/api/getmypost/${counter}`)
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
    this.setState({
      isFetching: true,
    })
    const data = await axios.get(`/api/getmypost/1`)
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
    const { myPosts = [], moreplease, isFetching = false } = this.state
    return (
      <Fragment>
        <ComposeSection
          successCallback={this.composeSuccess}
          initialData={this.props.initialData == undefined ? 'loading' : this.props.initialData}
        />
        {myPosts.length > 0 && (
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
