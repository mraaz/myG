import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import IndividualInvitation from './IndividualInvitation'

export default class MyApprovals extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    const self = this

    const get_group_approvals = async function() {
      try {
        const get_group_approvals = await axios.get(
          `/api/usergroup/get_all_my_group_approvals/${self.props.routeProps.match.params.id}`
        )
        self.setState({
          myGroup_approvals: get_group_approvals.data.admin_group_permissions,
        })
      } catch (error) {
        console.log(error)
      }
    }
    get_group_approvals()
  }

  showInvitations = () => {
    if (this.state.myGroup_approvals != undefined) {
      const rowLen = this.state.myGroup_approvals.length
      var lastRow = false
      if (rowLen == 0) {
        return <div className='invitation-info'>No pending approvals</div>
      }
      return this.state.myGroup_approvals.map((item, index) => {
        if (rowLen === index + 1) {
          lastRow = true
        }
        return (
          <IndividualInvitation
            invitation={item}
            key={index}
            lastRow={lastRow}
            type='group_approvals'
          />
        )
      })
    }
  }

  render() {
    return (
      <section id='invitation-page'>
        <div className='content-area invitation-page'>
          <div className='padding-container'>
            <div className='invitation-grey-container'>
              <h3>myApprovals</h3>
              <div className='padding-container'></div>
              <div className='invitation-container'>
                {this.showInvitations()}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
