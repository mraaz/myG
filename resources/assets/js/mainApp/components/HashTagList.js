import React, { Component, Fragment } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import IndividualPost from './IndividualPost'

import { logToElasticsearch } from '../../integration/http/logger'

export default class HashTagList extends Component {
  constructor() {
    super()
    this.state = {
      counter: 1,
      myPosts: [],
      moreplease: true,
      isFetching: false
    }
  }

  componentDidMount() {
    const self = this
    const { match } = this.props.routeProps

    const getHashTags = async function () {
      try {
        const data = await axios.post('/api/post/showHashTagPosts/', {
          content: decodeURIComponent(match.params.content),
          counter: 1
        })

        self.setState({
          myPosts: data.data.myPosts,
          moreplease: data.data.myPosts ? (data.data.myPosts.length > 9 ? true : false) : false,
          isFetching: false
        })
      } catch (error) {
        logToElasticsearch('error', 'HashTagList', 'componentDidMount' + ' ' + error)
      }
    }
    getHashTags()

    window.scrollTo({
      top: 500,
      behavior: 'smooth'
    })
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
    const { match } = this.props.routeProps

    if (myPosts.length > 0) {
      window.scrollTo(0, document.documentElement.offsetHeight - 3000)
    }
    const getPosts = async () => {
      const { counter = '' } = this.state
      const self = this
      try {
        const data = await axios.post('/api/post/showHashTagPosts/', {
          content: decodeURIComponent(match.params.content),
          counter: counter
        })

        if (data.data.myPosts.length == 0) {
          this.setState({
            myPosts: [...myPosts],
            moreplease: false,
            isFetching: false
          })
          return
        }
        this.setState({
          myPosts: [...myPosts, ...data.data.myPosts],
          isFetching: false
        })
      } catch (error) {
        logToElasticsearch('error', 'HashTagList', 'fetchMoreData' + ' ' + error)
      }
    }

    const myCounter = this.state.counter
    this.setState(
      {
        counter: count ? count : myCounter + 1,
        isFetching: true
      },
      () => {
        getPosts()
      }
    )
  }

  render() {
    const { myPosts = [], moreplease, isFetching = false } = this.state
    const { match } = this.props.routeProps

    return (
      <Fragment>
        <div className='viewHashTag__header'>
          <div className='title'>Hashtags for {decodeURIComponent(match.params.content)}</div>
        </div>
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
