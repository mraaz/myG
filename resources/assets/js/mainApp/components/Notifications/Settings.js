/*
 * Author : Nitin Tyagi
 * Github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import axios from 'axios'
import { Toast_style } from '../Utility_Function'
import SweetAlert from '../common/MyGSweetAlert'
import { logToElasticsearch } from '../../../integration/http/logger'
import {
  logoutAction,
  toggleMainChannelAction,
  toggleOnlineNotificationsAction,
  toggleNotificationSoundsAction,
  togglePushNotificationsAction
} from '../../../redux/actions/userAction'

import MangeSponsors from './MangeSponsors'
import { MyGSelect } from '../common'
import { selectLanguage } from '../../../common/user'
import { languages } from '../Languages/LanguageProvider'

class Settings extends Component {
  constructor() {
    super()
    this.state = {
      viaEmail: '',
      feature_on: false,
      alert: null,
      redirect_: false,
      modalStatus: false
    }
  }

  componentDidMount = () => {
    let params = new URLSearchParams(window.location.search)
    let activeTab = params.get('sponsor')
    if (activeTab) {
      this.setState({ modalStatus: true })
    } else {
      document.title = 'myG - Notification'

      window.scrollTo(0, 0)

      const self = this

      const environment = window.location.href.includes('localhost')
        ? 'development'
        : window.location.href.includes('myG.gg')
        ? 'production'
        : 'staging'

      if (environment == 'development') {
        this.setState({
          feature_on: true
        })
      }

      const getSettings = async function () {
        try {
          const getSettings = await axios.get('/api/settings')
          self.setState({
            viaEmail: getSettings.data.mySettings[0].email_notification
          })
        } catch (error) {
          logToElasticsearch('error', 'Settings', 'Failed getSettings:' + ' ' + error)
        }
      }
      getSettings()
    }
  }

  handleNotifyViaEmailChange = (event, viaEmail) => {
    if (viaEmail == this.state.viaEmail) return
    this.setState({ viaEmail })
    toast.success(<Toast_style text={'Roger roger'} />)
    try {
      axios.post('/api/settings', {
        email_notification: viaEmail
      })
    } catch (error) {
      logToElasticsearch('error', 'Settings', 'Failed handleNotifyViaEmailChange:' + ' ' + error)
    }
  }

  disableAcccount = () => {
    console.log('disableAcccount click')
  }

  createSiteMap = async () => {
    console.log('createSiteMap click')
    try {
      const getSettings = await axios.get('/api/settings/siteMap')
      console.log(getSettings, '<<<getSettings')
    } catch (error) {
      logToElasticsearch('error', 'Settings', 'Failed handleNotifyViaEmailChange:' + ' ' + error)
    }
  }

  createSiteMap2 = async () => {
    console.log('/api/clashroyale/show click')
    let strclanTag = 'YL9YCYU' //'#8G9VY92' //'QG8UQCV0' //'YL9YCYU'
    const clanTag = strclanTag.replace(/#/g, '')

    const clash_royale_player_id = 1
    const game_names_id = 1014

    try {
      //const tmp = await axios.get(`/api/clashroyale/show/${clanTag}`)

      //const tmp = await axios.get(`/api/ScheduleGame/getHeader_stats_header/${game_names_id}`)

      //Insert call
      const tmp = await axios.post('/api/clashroyale/storePlayerDetails/', {
        group_id: 2,
        player_tag: 'PUPGJJ9U',
        user_id: 1,
        clanTag: clanTag,
        reminder_one: '01:00',
        reminder_two: '01:00',
        reminder_three: '01:00'
      })

      // const tmp = await axios.post('/api/clashroyale/getPlayerDetails/', {
      //   group_id: 1,
      //   player_tag: '2R9PCGC'
      // })

      //const tmp = await axios.delete(`/api/clashroyale/deletePlayerDetails/${clash_royale_player_id}`)

      //THIS IS AN UPDATE STATEMENT
      // const tmp = await axios.post('/api/clashroyale/storePlayerDetails/', {
      //   clash_royale_players_id: 3,
      //   group_id: 1,
      //   player_tag: '2R9PCGC',
      //   user_id: 624,
      //   clanTag: clanTag,
      //   reminder_one: '01:00',
      //   reminder_two: '01:00',
      //   reminder_three: '01:00'
      // })

      console.log(tmp)
    } catch (error) {
      logToElasticsearch('error', 'Settings', 'Failed handleNotifyViaEmailChange:' + ' ' + error)
    }
  }

  sponsorsAction = () => {
    this.setState({ modalStatus: true })
  }

  handleModalStatus = (label) => {
    this.setState({ modalStatus: !this.state.modalStatus })
  }

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
        onCancel={() => this.hideAlert('false')}
      >
        You will not be able to recover this Account!!
      </SweetAlert>
    )

    this.setState({
      alert: getAlert()
    })
  }

  hideAlert = (text) => {
    this.setState({
      alert: null
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
      axios.get('/api/user/delete')
    } catch (error) {
      logToElasticsearch('error', 'Settings', 'Failed delete_exp:' + ' ' + error)
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
    const selectedLanguage = this.props.language && languages.find(({ value }) => this.props.language === value)

    return (
      <div className='settings__container'>
        {this.state.modalStatus && (
          <div className='Sponsors__container'>
            <a className='mGameDetailsBackButton'>
              <img
                className='mGameDetailsCaretImg'
                src='https://myG.gg/platform_images/View+Game/Down+Carrot.svg'
                onClick={this.handleModalStatus}
              />
              <span>{` Sponsors `}</span>
            </a>
            <MangeSponsors handleModalStatus={this.handleModalStatus} />
          </div>
        )}
        {!this.state.modalStatus && (
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
              <div className='title'>Main channel</div>
              <div className='button__switch browser__notification'>
                <label
                  className={`switchLabel ${this.props.mainChannelEnabled ? 'on' : 'off'}`}
                  onClick={() => this.props.toggleMainChannel(this.props.userId)}
                >
                  {this.props.mainChannelEnabled ? 'on' : 'off'}
                </label>
                <input
                  id='switch-orange'
                  type='checkbox'
                  className='switch'
                  value={this.props.mainChannelEnabled}
                  checked={this.props.mainChannelEnabled}
                  onChange={() => this.props.toggleMainChannel(this.props.userId)}
                />
              </div>
            </div>
            <div className='option'>
              <div className='title'>Online Notifications</div>
              <div className='button__switch browser__notification'>
                <label
                  className={`switchLabel ${this.props.onlineNotificationsEnabled ? 'on' : 'off'}`}
                  onClick={() => this.props.toggleOnlineNotifications(this.props.userId)}
                >
                  {this.props.onlineNotificationsEnabled ? 'on' : 'off'}
                </label>
                <input
                  id='switch-orange'
                  type='checkbox'
                  className='switch'
                  value={this.props.onlineNotificationsEnabled}
                  checked={this.props.onlineNotificationsEnabled}
                  onChange={() => this.props.toggleOnlineNotifications(this.props.userId)}
                />
              </div>
            </div>
            <div className='option languages'>
              <div className='title'>
                <FormattedMessage id='settings.languages' defaultMessage='Languages' />
              </div>
              <MyGSelect
                options={languages.map((language) => ({ value: language.value, label: this.props.intl.formatMessage(language.label) }))}
                onChange={({ value }) => selectLanguage(value)}
                value={selectedLanguage ? { value: this.props.language, label: this.props.intl.formatMessage(selectedLanguage.label) } : ''}
                placeholder={this.props.intl.formatMessage({ id: 'settings.languages.select', defaultMessage: 'Select a Language' })}
              />
            </div>
            <div className='option'>
              <div className='title'>Browser notifications</div>
              <div className='button__switch browser__notification'>
                <label
                  className={`switchLabel ${this.props.pushNotificationsEnabled ? 'on' : 'off'}`}
                  onClick={() => this.props.togglePushNotifications(this.props.userId)}
                >
                  {this.props.pushNotificationsEnabled ? 'on' : 'off'}
                </label>
                <input
                  id='switch-orange'
                  type='checkbox'
                  className='switch'
                  value={this.props.pushNotificationsEnabled}
                  checked={this.props.pushNotificationsEnabled}
                  onChange={() => this.props.togglePushNotifications(this.props.userId)}
                />
              </div>
            </div>
            <div className='option'>
              <div className='title'>Sound notifications</div>
              <div className='button__switch sound__notification'>
                <label
                  className={`switchLabel ${!this.props.notificationSoundsDisabled ? 'on' : 'off'}`}
                  onClick={() => this.props.toggleNotificationSounds(!this.props.notificationSoundsDisabled)}
                >
                  {!this.props.notificationSoundsDisabled ? 'on' : 'off'}
                </label>
                <input
                  id='switch-orange'
                  type='checkbox'
                  className='switch'
                  value={!this.props.notificationSoundsDisabled}
                  checked={!this.props.notificationSoundsDisabled}
                  onChange={() => this.props.toggleNotificationSounds(!this.props.notificationSoundsDisabled)}
                />
              </div>
            </div>
            <div className='option'>
              <div className='title'>
                <a
                  style={{ 'text-decoration': 'none', color: '#FFFFFF' }}
                  rel='noopener noreferrer'
                  href='https://github.com/mraaz/myG_RoadMap'
                  target='_blank'
                >
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
                    Minimalist (Weekly)
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
              {this.state.feature_on && (
                <button type='button' className='disableAcccount' onClick={this.createSiteMap}>
                  Create SiteMap
                </button>
              )}
              {this.state.feature_on && (
                <button type='button' className='disableAcccount' onClick={this.createSiteMap2}>
                  Pull Data
                </button>
              )}
              <button type='button' className='sponsorsAction' onClick={() => this.sponsorsAction()}>
                Manage your Sponsors
              </button>
              <button type='button' className='deleteAcccount' onClick={() => this.deleteAcccount()}>
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.userId,
    language: state.user.language,
    mainChannelEnabled: state.user.mainChannelEnabled,
    onlineNotificationsEnabled: state.user.onlineNotificationsEnabled,
    notificationSoundsDisabled: state.user.notificationSoundsDisabled,
    pushNotificationsEnabled: state.user.pushNotificationsEnabled
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
    togglePushNotifications: (userId) => dispatch(togglePushNotificationsAction(userId)),
    toggleMainChannel: (disabled) => dispatch(toggleMainChannelAction(disabled)),
    toggleOnlineNotifications: (disabled) => dispatch(toggleOnlineNotificationsAction(disabled)),
    toggleNotificationSounds: (disabled) => dispatch(toggleNotificationSoundsAction(disabled))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Settings))
