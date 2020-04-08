import React, { Component } from 'react'
import ComposeSection from './ComposeSection'
import Posts from './Posts'

export default class Home extends Component {
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
          <ComposeSection initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData} />
          <Posts initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData} />
        </div>
      )
    } else {
      return <div className='content-area'>Loading</div>
    }
  }
}
