import React, { Component } from 'react'
import MyComposeSection from './MyComposeSection'
import MyPosts from './MyPosts'

export default class MyHome extends Component {
  constructor() {
    super()
    this.state = {
      name: 'Raaz',
      initialData: undefined,
    }
  }
  componentDidMount() {
    this.setState({
      initialData: this.props.initialData,
    })
  }

  render() {
    if (this.state.initialData != undefined) {
      return (
        <div className='content-area'>
          <MyComposeSection initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData} />
          <MyPosts initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData} />
        </div>
      )
    } else {
      return <div className='content-area'>Loading</div>
    }
  }
}
