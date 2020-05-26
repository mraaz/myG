import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ToggleButton from 'react-toggle-button'
import SweetAlert from './common/MyGSweetAlert'
import { connect } from 'react-redux'
import { logoutAction } from '../../redux/actions/userAction'

class MySettings extends Component {
  constructor() {
    super()
    this.state = {
      value_email: false,
      value_password: false,
      value_delete: false,
      redirect_: false,
      alert: null,
    }
  }
  componentDidMount() {
    const self = this

    const getSettings = async function() {
      try {
        const getSettings = await axios.get('/api/settings')
        self.setState({
          value_email: getSettings.data.mySettings[0].email_notification,
        })

        const getGamers_you_might_know = await axios.post('/api/connections/gamers_you_might_know', {
          counter: 1,
        })

        console.log(getGamers_you_might_know)
      } catch (error) {
        console.log(error)
      }
    }

    getSettings()
  }

  confirm_delete_exp = () => {
    if (window.confirm('Are you REALLY sure you wish to delete your Account? Once gone, its gone, we wont be able to recover this!!!'))
      this.delete_exp()
  }

  delete_exp = () => {
    try {
      const byebyebye = axios.get('/api/user/delete')
    } catch (error) {
      console.log(error)
    }
    this.setState({ redirect_: true })
  }

  update_email = () => {
    this.setState({
      value_email: !this.state.value_email,
    })

    try {
      const post = axios.post('/api/settings', {
        email_notification: this.state.value_email ? 0 : 1,
      })
    } catch (error) {
      console.log(error)
    }
  }

  showAlert() {
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to delete your Account???'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='danger'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('true')}
        onCancel={() => this.hideAlert('false')}>
        You will not be able to recover this Account!!
      </SweetAlert>
    )

    this.setState({
      alert: getAlert(),
    })
  }

  hideAlert(text) {
    this.setState({
      alert: null,
    })
    if (text == 'true') {
      this.confirm_delete_exp()
    }
  }

  sendEmail = () => {
    //const post = axios.get('/api/email/summary_email')
    const getGamers_you_might_know = async function() {
      try {
        console.log('test')
        const master_controller = await axios.get('/api/connection/master_controller')
        console.log(master_controller)
      } catch (error) {
        console.log(error)
      }
    }
    getGamers_you_might_know()
  }

  report = () => {
    // ;<Link
    //   to='route'
    //   target='_blank'
    //   onClick={(event) => {
    //     event.preventDefault()
    //     window.open(this.makeHref('route'))
    //   }}
    // />
    // ;<Link
    //   to='https://github.com/mraaz/myG_RoadMap'
    //   target='_blank'
    //   onClick={(event) => {
    //     event.preventDefault()
    //     window.open(this.makeHref('route'))
    //   }}
    // />
  }

  fire_off_calculations = () => {
    // const total_number_of_friends = async function() {
    //   try {
    //     const get_stats = await axios.get('/api/userStatTransaction/master_controller')
    //     console.log(get_stats)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // total_number_of_friends()
    const callMasterControllerforConnections = async function() {
      try {
        const get_stats = await axios.post('/api/connections/communities_you_might_know', {
          counter: 1,
        })
        console.log(get_stats)
        //console.log('Raaz-inside')
      } catch (error) {
        console.log(error)
      }
    }
    callMasterControllerforConnections()
  }

  fire_off_test = () => {
    const callMasterControllerforConnections = async function() {
      try {
        const get_stats = await axios.post('api/ScheduleGame/test', {
          dota2_medal_ranks: 123,
          dota2_server_regions: null,
          dota2_roles: null,
        })
        console.log(get_stats)
        //console.log('Raaz-inside')
      } catch (error) {
        console.log(error)
      }
    }
    callMasterControllerforConnections()
  }

  render() {
    if (this.state.redirect_) {
      this.props.logout()
      window.location.replace('/logout')
      return null
    }
    return (
      <section id='mySettings-page'>
        <div className='content-area mySettings-page'>
          {this.state.alert}
          <div className='padding-container'>
            <div className='invitation-grey-container'>
              <h3>mySettings!</h3>
              <button className='save' onClick={this.sendEmail}>
                Send Email
              </button>
              <button className='save' onClick={this.fire_off_calculations}>
                Fire off calcs
              </button>
              <button className='save' onClick={this.fire_off_test}>
                Fire off test
              </button>
              <a rel='noopener noreferrer' href='https://github.com/mraaz/myG_RoadMap' target='_blank'>
                Report bugs, request feature, help improve myG :)
              </a>
              <div className='padding-container'></div>
              <div className='mySettings-container'>
                <div className='email-notification'>
                  Email notifications:
                  <div className='email-toggle'>
                    <ToggleButton
                      value={this.state.value_email || false}
                      onToggle={(value_email) => {
                        this.update_email()
                      }}
                    />
                  </div>
                </div>
                <div className='delete-account'>
                  Delete Account:
                  <div className='delete-toggle'>
                    <ToggleButton value={this.state.value_delete || false} onToggle={(value_delete) => this.showAlert()} />
                  </div>
                </div>
                <div className='change-password'>
                  Change Password:
                  <div className='change-toggle'>
                    <ToggleButton
                      value={this.state.value_password || false}
                      onToggle={(value_password) => {
                        window.location.href = '/changepwd'
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

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(MySettings)
