import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MyComposeSection from './MyComposeSection'
import IndividualGroup from './IndividualGroup'
import GroupHeader from './GroupHeader'
import axios from 'axios'

export default class GroupHome extends Component {
  constructor() {
    super()
    this.state = {
      show_page: false,
    }
  }
  componentDidMount() {
    const self = this

    const getGroupHeader = async function() {
      try {
        const getGroupHeader = await axios.get(`/api/groups/${self.props.routeProps.match.params.id}`)
        if (getGroupHeader.data.group.length == 0) {
          return
        }
        self.setState({
          show_page: true,
        })
      } catch (error) {
        console.log(error)
      }
    }

    getGroupHeader()

    this.setState({
      initialData: this.props.initialData,
    })
  }

  render() {
    if (this.state.show_page) {
      return (
        <div className='content-area group-home'>
          <GroupHeader
            groups_id={this.props.routeProps.match}
            initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
          />
          <MyComposeSection
            groups_id={this.props.routeProps.match}
            initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
          />
          <IndividualGroup
            groups_id={this.props.routeProps.match}
            initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
          />
        </div>
      )
    } else {
      return <div className='content-area group-home'>Opp's no groups found :( </div>
    }
  }
}
