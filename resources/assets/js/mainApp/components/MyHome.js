import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MyComposeSection from './MyComposeSection'
import MyPosts from './MyPosts'

export default class MyHome extends Component {
  constructor() {
    super()
    this.state = {
      name: 'Raaz',
    }
  }
  componentWillMount() {
    this.setState({
      initialData: this.props.initialData,
    })
  }

  render() {
    return (
      <div className='content-area'>
        <MyComposeSection
          initialData={
            this.state.initialData == undefined
              ? 'loading'
              : this.state.initialData
          }
        />
        <MyPosts
          initialData={
            this.state.initialData == undefined
              ? 'loading'
              : this.state.initialData
          }
        />
      </div>
    )
  }
}
