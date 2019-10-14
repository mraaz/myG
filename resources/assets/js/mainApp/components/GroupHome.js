import React, { Component } from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"
import MyComposeSection from "./MyComposeSection"
import IndividualGroup from "./IndividualGroup"
import GroupHeader from "./GroupHeader"


export default class GroupHome extends Component {
  constructor() {
    super()
  }
  componentWillMount(){
    this.setState({
      initialData: this.props.initialData
      })
  }

  render() {
    return (
      <div className="content-area group-home">
        <GroupHeader groups_id={this.props.routeProps.match} initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData}/>
        <MyComposeSection groups_id={this.props.routeProps.match} initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData}/>
        <IndividualGroup groups_id={this.props.routeProps.match} initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData}/>
      </div>
    )
  }
}
