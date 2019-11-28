import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Route, Redirect } from 'react-router'

export default class IndividualGroups extends Component {
  constructor() {
    super()
    this.state = {
      redirect_groups: false
    }
  }

  redirect(){
    this.setState({redirect_groups: true})
  }

  render() {
    if (this.state.redirect_groups){
      const {groups} = this.props
      var tmp = `/groups/${groups.id}`
      return <Redirect push to ={tmp}  />
    }

    let {groups} = this.props
    return (
      <div className="groups-info">
        <div className="group_img" onClick={() => this.redirect()} style={{
          backgroundImage: `url(${groups.group_img})`
        }}> </div>
        <div className="group-name">{groups.name}
        </div>
      </div>
    )
  }
}
