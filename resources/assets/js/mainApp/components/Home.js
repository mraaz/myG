import React, { Component } from 'react'
import ComposeSection from './ComposeSection'
import Posts from './Posts'
import AnalyticsBox from './AnalyticsBox'
import { Link } from 'react-router-dom'

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
          <AnalyticsBox />
          <ComposeSection initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData} />
          <div className='links'>
            <Link to={`/`} className='link active'>
              Home
            </Link>
            <Link to={`/groups`} className='link'>
              Communities
            </Link>
            <Link to={`/notifications`} className='link'>
              notifications
            </Link>
            <Link to={`/mygames`} className='link'>
              My Games
            </Link>
            <Link to={`/mypost`} className='link'>
              My Posts
            </Link>
          </div>
          <Posts initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData} />
        </div>
      )
    } else {
      return <div className='content-area'>Loading</div>
    }
  }
}
