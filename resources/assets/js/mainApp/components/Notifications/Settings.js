/*
 * Author : Nitin Tyagi
 * Github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import { Toast_style } from '../Utility_Function'
import SweetAlert from '../common/MyGSweetAlert'

import axios from 'axios'

import { logToElasticsearch } from '../../../integration/http/logger'
import { logoutAction } from '../../../redux/actions/userAction'

import { toast } from 'react-toastify'
import { connect } from 'react-redux'

class Settings extends Component {
  constructor() {
    super()
    this.state = {
      viaEmail: '',
      feature_on: false,
      alert: null,
      redirect_: false,
    }
  }

  componentDidMount = () => {
    document.title = 'myG - Notification'

    window.scrollTo(0, 0)

    const self = this

    const getSettings = async function() {
      try {
        const getSettings = await axios.get('/api/settings')
        self.setState({
          viaEmail: getSettings.data.mySettings[0].email_notification,
        })
      } catch (error) {
        logToElasticsearch('error', 'Settings', 'Failed getSettings:' + ' ' + error)
      }
    }

    getSettings()
  }

  handleNotifyViaEmailChange = (event, viaEmail) => {
    if (viaEmail == this.state.viaEmail) return
    this.setState({ viaEmail })
    toast.success(<Toast_style text={'Roger roger'} />)
    try {
      const post = axios.post('/api/settings', {
        email_notification: viaEmail,
      })
    } catch (error) {
      logToElasticsearch('error', 'Settings', 'Failed handleNotifyViaEmailChange:' + ' ' + error)
    }
  }

  disableAcccount = () => {
    console.log('disableAcccount click')
  }

  // deleteAcccount = () => {
  //   console.log('disableAcccount click')
  // }

  deleteAcccount() {
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

  render() {
    if (this.state.redirect_) {
      this.props.logout()
      window.location.href = '/logout'
      return null
    }

    const { active } = this.props

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div className='settings' style={isActive}>
        {this.state.alert}
        {this.state.feature_on && (
          <div className='cred__container'>
            <div className='cred__row'>
              <div className='cred__label'>UserName</div>
              <div className='cred__details'>
                <div className='cred__image'>
                  <img src='https://myG.gg/platform_images/Dashboard/logo.svg' />
                </div>
                <div className='cred__username'>@bruno</div>
                <div className='cred__action'>
                  <button type='button'>Change</button>
                </div>
              </div>
            </div>
            <div className='cred__row'>
              <div className='cred__label'>Logged Using</div>
              <div className='cred__details'>
                <div className='cred__image'>
                  <img src='https://myG.gg/platform_images/Dashboard/logo.svg' />
                </div>
                <div className='cred__username'>@bruno</div>
                <div className='cred__action'>
                  <button type='button'>Change</button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className='option'>
          <div className='title'>Browser notifications</div>
          <div className='button__switch browser__notification'>
            <input type='checkbox' defaultChecked={true} id='switch-orange' onChange={() => {}} className='switch' />
          </div>
        </div>
        <div className='option'>
          <div className='title'>Sound notifications</div>
          <div className='button__switch sound__notification'>
            <input type='checkbox' defaultChecked={true} id='switch-orange' onChange={() => {}} className='switch' />
          </div>
        </div>
        <div className='option'>
          <div className='title'>
            <a
              style={{ 'text-decoration': 'none', color: '#FFFFFF' }}
              rel='noopener noreferrer'
              href='https://github.com/mraaz/myG_RoadMap'
              target='_blank'>
              Report bugs or request features{' '}
            </a>
          </div>
        </div>
        <div className='option via__email-container'>
          <div className='title'>Notify via E-mail</div>
          <div className='via__email'>
            <div>
              <label className='container'>
                Nay, Nope, Never
                <input
                  type='checkbox'
                  name='never'
                  checked={this.state.viaEmail == 0}
                  onChange={(e) => this.handleNotifyViaEmailChange(e, 0)}
                  value={0}
                />
                <span className='checkmark'></span>
              </label>
            </div>
            <div>
              <label className='container'>
                Mnimalist (Weekly)
                <input
                  type='checkbox'
                  name='minimal'
                  checked={this.state.viaEmail == 1}
                  onChange={(e) => this.handleNotifyViaEmailChange(e, 1)}
                  value={1}
                />
                <span className='checkmark'></span>
              </label>
            </div>
            <div>
              <label className='container'>
                Maximalist (Daily)
                <input
                  type='checkbox'
                  name='always'
                  checked={this.state.viaEmail == 2}
                  onChange={(e) => this.handleNotifyViaEmailChange(e, 2)}
                  value={2}
                />
                <span className='checkmark'></span>
              </label>
            </div>
          </div>
        </div>
        <div className='setting_actions'>
          {this.state.feature_on && (
            <button type='button' className='disableAcccount' onClick={this.disableAcccount}>
              Disable Account
            </button>
          )}
          <button type='button' className='deleteAcccount' onClick={() => this.deleteAcccount()}>
            Delete Account
          </button>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
  }
}

export default connect(null, mapDispatchToProps)(Settings)
