import React, { Component } from "react"
import Select from 'react-select'
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"

export default class IndividualMember extends Component {
  constructor() {
    super()
    this.state = {
      show_controls: true,
      show_delete: false,
      show_promoted: false,
      show_demoted: false,
      show_promoted_icon: true,
      show_demoted_icon: true,
      show_kick_icon: true
    }
  }

  componentWillMount(){
    //0=Owner, 1=Admin, 2=Moderator, 3=User, 42=Pending, -1=Not a member

    if(this.props.member.permission_level == 0 || this.props.member.permission_level == 42){
      this.setState({show_controls: false})
    }

    if(this.props.member.permission_level == 1){
      this.setState({show_promoted_icon: false})
    }

    if(this.props.member.permission_level == 3){
      this.setState({show_demoted_icon: false})
    }

    if(this.props.user_permission == 3 || this.props.user_permission == -1 || this.props.user_permission == 42 ){
      this.setState({show_controls: false})
    }

    if(this.props.user_permission == 2){
      if(this.props.member.permission_level == 2 || this.props.member.permission_level == 1){
        this.setState({show_controls: false})
      }
    }
  }

  delete_member = () => {
    try{
      const delete_member = axios.get(`/api/usergroup/delete_member/${this.props.member.group_id}/${this.props.member.id}`)
    } catch(error){
      console.log(error)
    }
    this.setState({show_controls: false, show_promoted:false, show_delete: true, show_demoted: false})
    //NEED to do notifications
  }

  promote_member = () => {
    try{
      const delete_member = axios.get(`/api/usergroup/promote_member/${this.props.member.group_id}/${this.props.member.id}`)
    } catch(error){
      console.log(error)
    }
    this.setState({show_controls: false, show_delete: false, show_promoted: true, show_demoted: false})
  }

  demote_member = () => {
    try{
      const delete_member = axios.get(`/api/usergroup/demote_member/${this.props.member.group_id}/${this.props.member.id}`)
    } catch(error){
      console.log(error)
    }
    this.setState({show_controls: false, show_delete: false, show_promoted: false, show_demoted: true})
  }

  render() {
    let {member, lastRow} = this.props
    var show_profile_img = false
    if (member.profile_img != null){
      show_profile_img = true
    }
    return (      
      <div className="invitation-info">
        {show_profile_img && <a href={`/profile/${member.usergroups_user_id}`} className="user-img" style={{
          backgroundImage: `url('${member.profile_img}')`}}/>}
        {!show_profile_img && <a href={`/profile/${member.usergroups_user_id}`} className="user-img" style={{
          backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/default_user/new-user-profile-picture.png')`
        }}/>}
        <div className="user-info">
          {`${member.first_name}`} {`${member.last_name}`}
        </div>
        {this.state.show_controls && <div className="member-controls">
          {this.state.show_promoted_icon && <div className="promote" onClick={() => { if (window.confirm('Are you sure you wish to promote this member?')) this.promote_member() } }>
            <i className="fas fa-arrow-circle-up"></i>
          </div>}
          {this.state.show_demoted_icon && <div className="depromote" onClick={() => { if (window.confirm('Are you sure you wish to demote this member?')) this.demote_member() } }>
            <i className="fas fa-arrow-alt-circle-down"></i>
          </div>}
          {this.state.show_kick_icon && <div className="kick" onClick={() => { if (window.confirm('Are you sure you wish to remove this member from the group?')) this.delete_member() } }>
            <i className="fas fa-user-times"></i>
          </div>}
        </div>}
        {this.state.show_delete && <div className="member-controls">
        Removed
        </div>}
        {this.state.show_promoted && <div className="member-controls">
        Promoted
        </div>}
        {this.state.show_demoted && <div className="member-controls">
        Demoted
        </div>}
        {!lastRow && <div className="line-break">
          <hr />
        </div>}
        {lastRow && <div className="last-row">

        </div>}
      </div>
    )
  }
}
