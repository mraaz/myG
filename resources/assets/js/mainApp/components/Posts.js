import React, { Component } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import IndividualPost from './IndividualPost'

export default class Posts extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      myPosts: [],
      moreplease: true,
    }
  }

  componentDidMount() {
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
    const self = this

    const getPosts = async function() {
      try {
        const myPosts = await axios.get(`/api/post/${self.state.counter}`)

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

  render() {
    if (this.state.myPosts != undefined) {
      return (
        <section id='posts'>
          <InfiniteScroll dataLength={this.state.myPosts.length} next={this.fetchMoreData} hasMore={this.state.moreplease}>
            {this.showLatestPosts()}
          </InfiniteScroll>
        </section>
      )
    } else {
      return <section id='posts'></section>
    }
  }
}
const app = document.getElementById('app')
