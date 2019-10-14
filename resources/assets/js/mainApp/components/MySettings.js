import React, { Component } from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"
import ToggleButton from 'react-toggle-button'


export default class MySettings extends Component {
  constructor() {
    super()
    this.state = {
      value_email: false,
      value_password: false,
      value_delete: false
    }
  }
  componentWillMount(){
    const self = this

    const getSettings = async function(){
      try{
        const getSettings = await axios.get("/api/settings")
        self.setState({
          value_email: getSettings.data.mySettings[0].email_notification
        })

      } catch(error){
        console.log(error)
      }
    }

    getSettings()
  }

  confirm_delete_exp = () =>{
    if (window.confirm('Are you REALLY sure you wish to delete your Account? Once gone, its gone, we wont be able to recover this!!!')) this.delete_exp()
  }

  delete_exp = async () => {
    try{
      const byebyebye = await axios.get("/api/user/delete")
    } catch(error){
      console.log(error)
    }
    window.location.href = "/logout"
  }

  update_email = async () => {
    this.setState({
      value_email: !this.state.value_email,
    })

    try{
      const post = await axios.post('/api/settings',{
        email_notification: this.state.value_email ? 0 : 1
      })
    } catch(error){
      console.log(error)
    }
  }

  render() {
    const self=this
    return (
      <section id="mySettings-page">
        <div className="content-area mySettings-page">
          <div className="padding-container">
            <div className="invitation-grey-container">
              <h3>mySettings</h3>
              <div className="padding-container">
              </div>
              <div className="mySettings-container">
                <div className="email-notification">
                  Email notifications:
                  <div className="email-toggle">
                    <ToggleButton
                      value={ this.state.value_email || false }
                      onToggle={(value_email) => {
                        this.update_email()
                      }}
                    />
                  </div>
                </div>
                <div className="delete-account">
                  Delete Account:
                  <div className="delete-toggle">
                    <ToggleButton
                      value={ this.state.value_delete || false }
                      onToggle={(value_delete) => {
                        { if (window.confirm('Are you sure you wish to delete your Account???')) this.confirm_delete_exp() }
                      }}
                    />
                  </div>
                </div>
                <div className="change-password">
                  Change Password:
                  <div className="change-toggle">
                    <ToggleButton
                      value={ this.state.value_password || false }
                      onToggle={(value_password) => {
                        window.location.href = "/changepwd"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
