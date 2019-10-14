import React, { Component } from "react"
import Select from 'react-select'
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"

export default class IndividualGroups extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  redirect(){
    const {groups} = this.props
    window.location.href = `/groups/${groups.id}`
  }

  render() {
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
