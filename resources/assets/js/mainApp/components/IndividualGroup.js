import React, { Component } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

import GroupsProcessing from './GroupsProcessing'

export default class IndividualGroup extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      myPosts: [],
      moreplease: true,
    }
  }

  componentDidMount() {
    if (this.props.initialData.userInfo != undefined) {
      window.scrollTo(0, 0)
      this.fetchMoreData()
    }
  }

  showLatestPosts = () => {
    if (this.state.myPosts != undefined) {
      return this.state.myPosts.map((item, index) => {
        return <GroupsProcessing post={item} key={index} user={this.props.initialData} />
      })
    }
  }

  fetchMoreData = () => {
    if (this.state.myPosts.length > 0) {
      window.scrollTo(0, document.documentElement.offsetHeight - 4000)
    }
    const self = this

    const getPosts = async function() {
      try {
        const myPosts = await axios.get(`/api/get_group_posts/${self.props.groups_id.params.id}/${self.state.counter}`)

        var i
        var myLikes

        if (myPosts.data.groupPosts.data.length == 0) {
          self.setState({
            moreplease: false,
          })
          return
        }

        self.setState({
          myPosts: self.state.myPosts.concat(myPosts.data.groupPosts.data),
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
