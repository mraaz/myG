import React, { Component } from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom"
import axios from "axios"
import FileOpenModal from './FileOpenModal'


export default class GroupHeader extends Component {
  constructor() {
    super()
    this.state = {
      myPage: false,
      status: 0, //0: Not a member of this group, 1: Admin of group, 2: Owner, 3: User, 42:Pending approval
      bFileModalOpen: false,
      statusTxt: 'Join',
      show_approvals: false
    }

    this.callbackFileModalClose = this.callbackFileModalClose.bind(this);
    this.callbackFileModalConfirm = this.callbackFileModalConfirm.bind(this);

  }
  componentWillMount(){
    const self = this

    const getGroupHeader = async function(){
      try{
        const getGroupHeader = await axios.get(`/api/groups/${self.props.groups_id.params.id}`)
        if (getGroupHeader.data.group[0].user_id != self.props.initialData.userInfo.id){
          const getGroupPermissions = await axios.get(`/api/usergroup/mygroup_details/${self.props.groups_id.params.id}`)
          if (getGroupPermissions.data.mygroup_details.length > 0){
            if ( (getGroupPermissions.data.mygroup_details[0].permission_level == "1")  || (getGroupPermissions.data.mygroup_details[0].permission_level == "2") ){
              self.state.myPage = true
              self.state.status = 1
              self.state.statusTxt = "Joined"
              self.state.show_approvals = true
            }else if (getGroupPermissions.data.mygroup_details[0].permission_level == "42") {
              self.state.statusTxt = "Pending Approval"
              self.state.status = 42
            } else {
              self.state.statusTxt = "Joined"
              self.state.status = 3
            }
          }else {
            self.state.status = 0
            self.state.statusTxt = "Join"
          }
        }else {
          self.state.myPage = true
          self.state.status = 2
          self.state.statusTxt = "Joined"
          self.state.show_approvals = true
        }

        if (self.state.status == 3){
          if (getGroupHeader.data.group[0].all_accept){
            self.state.show_approvals = true
          }
        }

        self.setState({
          group_info: getGroupHeader.data.group[0]
        })

      } catch(error){
        console.log(error)
      }
    }

    if (this.props.initialData.userInfo != undefined){
      getGroupHeader()
    }
  }

  uploadGroup_img(){
    this.setState({
      bFileModalOpen: true,
    })
  }

  callbackFileModalClose(){
    this.setState({
      bFileModalOpen: false,
    })
  }

  callbackFileModalConfirm(src){
    this.state.group_info.group_img = src

    this.setState({
      bFileModalOpen: false,
    })

    try{
      const update_img = axios.post('/api/groups/update_img',{
        group_id: this.props.groups_id.params.id,
        group_img: src
      })
    } catch(error){
      console.log(error)
    }
  }

  show_approvals_screen = () => {
    window.location.href = `/myApprovals/${this.props.groups_id.params.id}`
  }

  change_type = () => {
    switch (this.state.group_info.type) {
      case 1:
        this.state.group_info.type = 2
        break;
      case 2:
        this.state.group_info.type = 3
        break;
      case 3:
        this.state.group_info.type = 1
        break;
    }
    try{
      const update_group_type = axios.get(`/api/groups/update_type/${this.props.groups_id.params.id}/${this.state.group_info.type}`)
    }catch(error){
      console.log(error)
    }
    this.forceUpdate()
  }

  statusToggle = async () => {
    if (this.state.status == 2) {
      alert("Sorry, The captain goes down with the ship, you can't leave" )
      return
    }
    if (this.state.statusTxt == "Joined"){
      if (window.confirm('Are you sure you wish to remove yourself from this group?')){
        try{
          const deleteRegistration = axios.get(`/api/usergroup/delete/${this.props.groups_id.params.id}`)
          const killInvite = axios.get(`/api/notifications/delete_group/${this.props.groups_id.params.id}`)
        }catch(error){
          console.log(error)
        }
        this.setState({
          statusTxt: "Join",
          show_approvals: false
        })
      }
    }else if (this.state.statusTxt == "Join"){
      try{
        const sendInvite = axios.post('/api/usergroup/create',{
          group_id: this.props.groups_id.params.id
        })
        const owner_invitation = axios.post('/api/notifications/addGroup',{
          other_user_id: this.state.group_info.user_id,
          group_id: this.props.groups_id.params.id
        })
        if (this.state.group_info.all_accept){
          const group_invitation = axios.post('/api/notifications/add_all_to_Group',{
            group_id: this.props.groups_id.params.id
          })
        }else {
          const group_invitation = axios.post('/api/notifications/add_vip_to_Group',{
            group_id: this.props.groups_id.params.id
          })
        }
      } catch(error){
        console.log(error)
      }
      this.setState({
        statusTxt: "Pending Approval"
      })
    }else if (this.state.statusTxt == "Pending Approval"){
      if (window.confirm('Are you sure you wish to remove yourself from this group?')){
        try{
          const deleteRegistration = axios.get(`/api/usergroup/delete/${this.props.groups_id.params.id}`)
          const killInvite = axios.get(`/api/notifications/delete_group/${this.props.groups_id.params.id}`)
        } catch(error){
          console.log(error)
        }
        this.setState({
          statusTxt: "Join"
        })
      }
    }
  }

  render() {
    if(this.state.group_info !== undefined) {
      let str_group_type = ""
      switch (this.state.group_info.type) {
        case 1:
          str_group_type = "Public"
          break;
        case 2:
          str_group_type = "Closed"
          break;
        case 3:
          str_group_type = "Secret"
          break;
      }
      return (
        <div className="header-area">
          <FileOpenModal
            bOpen={this.state.bFileModalOpen}
            callbackClose={this.callbackFileModalClose}
            callbackConfirm={this.callbackFileModalConfirm}
          ></FileOpenModal>
          <div className="top-container">
            <div className="userbackground-img" style={{
              backgroundImage: `url('${this.state.group_info.group_img}')`
              }}>
              {this.state.myPage && <div className="header-background-uploader"  onClick={() => this.uploadGroup_img()}>Update</div>}
            </div>
            <div className="group-controller-container">
              <div className="group-status">
                <button className="status" onClick={this.statusToggle}>{this.state.statusTxt}</button>
              </div>
              <div className="member-list">
                <Link to={`/groups/${this.props.groups_id.params.id}/members`}>
                  <button type="button" className="members">Members</button>
                </Link>
              </div>
              {this.state.show_approvals && <div className="group-approvals">
                <button className="approvals" onClick={this.show_approvals_screen}>Group Approvals</button>
              </div>}
              <div className="group-type">
                {this.state.myPage === true ? <button type="button" onClick={() => { if (window.confirm('Are you sure you wish to change this group type?')) this.change_type() } } className="type">{str_group_type}</button> : str_group_type }
              </div>
              <div className="group-name">
                {this.state.group_info.name}
              </div>
            </div>
          </div>
        </div>
      )
    } else{
      return (
        <div className="header-area">
          Loading
        </div>
      )
    }
  }
}
