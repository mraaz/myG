import React, { Component } from 'react'
import axios from 'axios'
import IndividualPost from './IndividualPost'

export default class SinglePost extends Component {
  constructor() {
    super()
    this.state = {
      myPost: [],
    }
  }

  componentDidMount() {
    const self = this
    const { match } = this.props.routeProps

    const getPost = async function() {
      try {
        const myPost = await axios.get(`/api/getpost/${match.params.id}`)

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
    if (this.state.myPost != []) {
      return this.state.myPost.map((item, index) => {
        return <IndividualPost post={item} key={index} user={this.props.initialData} source={'news_feed'} />
      })
    }
  }

  render() {
    if (this.state.myPost != []) {
      return (
        <section id='posts' className='active'>
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
