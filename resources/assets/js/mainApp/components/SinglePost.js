import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import IndividualPost from './IndividualPost'

export default class SinglePost extends Component {
  constructor() {
    super()
    this.state = {
      myPost: [],
    }
  }

  componentWillMount() {
    const self = this
    const { match } = this.props.routeProps
    var i
    var myLikes

    const getPost = async function() {
      try {
        const myPost = await axios.get(`/api/getpost/${match.params.id}`)

        for (i = 0; i < myPost.data.myPost.length; i++) {
          myLikes = await axios.get(`/api/likes/${myPost.data.myPost[i].id}`)
          myPost.data.myPost[i].total = myLikes.data.number_of_likes[0].total
          myPost.data.myPost[i].no_of_comments =
            myLikes.data.no_of_comments[0].no_of_comments
          if (myLikes.data.number_of_likes[0].total != 0) {
            myPost.data.myPost[i].admirer_first_name =
              myLikes.data.admirer_UserInfo.first_name
            myPost.data.myPost[i].admirer_last_name =
              myLikes.data.admirer_UserInfo.last_name
          } else {
            myPost.data.myPost[i].admirer_first_name = ''
            myPost.data.myPost[i].admirer_last_name = ''
          }
          if (myLikes.data.do_I_like_it[0].myOpinion != 0) {
            myPost.data.myPost[i].do_I_like_it = true
          } else {
            myPost.data.myPost[i].do_I_like_it = false
          }
        }

        self.setState({
          myPost: self.state.myPost.concat(myPost.data.myPost),
        })
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  }

  showLatestPost = () => {
    if (this.state.myPost != undefined) {
      return this.state.myPost.map((item, index) => {
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

  render() {
    if (this.state.myPost != undefined) {
      return (
        <section id='posts'>
          <div className='startofSinglePage'></div>
          {this.showLatestPost()}
        </section>
      )
    } else {
      return <section id='posts'></section>
    }
  }
}
const app = document.getElementById('app')
