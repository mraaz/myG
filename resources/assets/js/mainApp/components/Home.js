import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ComposeSection from './ComposeSection'
import Posts from './Posts'

export default class Home extends Component {
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
        <ComposeSection initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData} />
        <Posts initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData} />
      </div>
    )
  }
}
