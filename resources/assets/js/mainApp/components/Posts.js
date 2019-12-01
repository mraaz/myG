import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import IndividualPost from './IndividualPost'

export default class Posts extends Component {
  constructor() {
    super()
    this.state = {
      counter: 1,
      myPosts: [],
      moreplease: true,
    }
  }

  componentWillMount() {
    this.fetchMoreData()
  }

  showLatestPosts = () => {
    if (this.state.myPosts != undefined) {
      return this.state.myPosts.map((item, index) => {
        return (
          <IndividualPost
            post={item}
            key={index}
            user={this.props.initialData}
          />
        )
      })
    }
  }

  fetchMoreData = () => {
    var myCounter = this.state.counter
    this.setState({
      counter: this.state.counter + 1,
    })

    const self = this
    const getPosts = async function() {
      try {
        const myPosts = await axios.get(`/api/post/${myCounter}`)

        var i
        var myLikes

        if (myPosts.data.myPosts.data.length == 0) {
          self.setState({
            moreplease: false,
          })
          return
        }

        for (i = 0; i < myPosts.data.myPosts.data.length; i++) {
          myLikes = await axios.get(
            `/api/likes/${myPosts.data.myPosts.data[i].id}`
          )
          myPosts.data.myPosts.data[i].total =
            myLikes.data.number_of_likes[0].total
          myPosts.data.myPosts.data[i].no_of_comments =
            myLikes.data.no_of_comments[0].no_of_comments
          if (myLikes.data.number_of_likes[0].total != 0) {
            myPosts.data.myPosts.data[i].admirer_first_name =
              myLikes.data.admirer_UserInfo.first_name
            myPosts.data.myPosts.data[i].admirer_last_name =
              myLikes.data.admirer_UserInfo.last_name
          } else {
            myPosts.data.myPosts.data[i].admirer_first_name = ''
            myPosts.data.myPosts.data[i].admirer_last_name = ''
          }
          if (myLikes.data.do_I_like_it[0].myOpinion != 0) {
            myPosts.data.myPosts.data[i].do_I_like_it = true
          } else {
            myPosts.data.myPosts.data[i].do_I_like_it = false
          }
        }

        self.setState({
          myPosts: self.state.myPosts.concat(myPosts.data.myPosts.data),
        })
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }

  render() {
    if (this.state.myPosts != undefined) {
      return (
        <section id='posts'>
          <InfiniteScroll
            dataLength={this.state.myPosts.length}
            next={this.fetchMoreData}
            hasMore={this.state.moreplease}>
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
