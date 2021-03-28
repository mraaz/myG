/*
 * Author : Nitin Tyagi
 * Github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import TopTabs from './TopTabs'
import { clicked_sonsors, handleTime, mark_read_status } from './helperFunction'
import { Toast_style } from '../Utility_Function'
import { toast } from 'react-toastify'
import NoRecord from './NoRecord'
import SweetAlert from '../common/MyGSweetAlert'
const defaultUserImage = 'https://myG.gg/default_user/new-user-profile-picture.png'
const tabObj = {
  0: 0,
  1: 1,
  2: 11,
  3: 12,
}

export default class sponsors extends Component {
  constructor() {
    super()
    this.state = {
      fetching: false,
      sponsors: [],
      moreplease: true,
      counter: 1,
      tab: 0,
    }
    this.myRef = React.createRef()
  }

  componentDidMount = async () => {
    document.title = 'myG - Notification'

    const { counter, tab } = this.state
    window.scrollTo(0, 0)
    this.setState({ fetching: true })
    const getSponsors = await axios.get(`/api/sponsor/show_approval/${counter}`)

    if (getSponsors.data.length > 0) {
      this.setState({ sponsors: getSponsors.data, fetching: false }, () => {
        this.props.setNotificationsCount(this.state.sponsors.length)
      })
    }
  }

  getMoreNotification = async () => {
    const { counter, sponsors = [], tab } = this.state
    let count = counter + 1
    this.setState({ fetching: true })
    const getSponsors = await axios.get(`/api/sponsor/show_approval/${counter}`)

    if (getSponsors.data && getSponsors.data.length == 0) {
      this.setState({
        moreplease: false,
        fetching: false,
      })
      return
    }
    if (getSponsors.data && getSponsors.data.length > 0) {
      if (count > 1) {
        this.setState({ sponsors: [...sponsors, ...getSponsors.data], counter: count, fetching: false }, () => {
          this.props.setNotificationsCount(this.state.sponsors.length)
        })
      } else {
        this.setState({ sponsors: getSponsors.data, fetching: false }, () => {
          this.props.setNotificationsCount(this.state.sponsors.length)
        })
      }
    }
  }

  handleScroll = (event) => {
    const _event = event.currentTarget,
      _current = this.myRef.current
    if (_event.scrollTop + (3 / 2) * _current.offsetHeight > _event.scrollHeight && this.state.moreplease && !this.state.fetching) {
      this.getMoreNotification()
    }
  }

  handleActionClick = (type, data) => {
    const { sponsors } = this.state
    clicked_sonsors(type, data.id)
    const filtersponsors = sponsors.filter((approval) => approval.id != data.id)
    this.setState({ sponsors: filtersponsors }, () => {
      this.props.setNotificationsCount(this.state.sponsors.length)
    })
    toast.success(<Toast_style text={`Yeah! you have successfully ${type} the request.`} />)
  }

  renderActivityText = (props) => {
    const { link, media_url } = props
    return (
      <div className='notification__text'>
        <a href={link} target='_blank'>
          <div>{link}</div>
          <img className='aproval__image' src={media_url} onError={this.addDefaultSrc} />
        </a>
      </div>
    )
  }

  addDefaultSrc(ev) {
    ev.target.src = 'https://myG.gg/default_user/new-user-profile-picture.png'
  }

  handleClickNotiFication = (id, index) => {
    let { sponsors = [] } = this.state

    if (sponsors.length > 0 && sponsors[index].read_status != 1) {
      if (sponsors[index].read == undefined || sponsors[index].read == false) {
        sponsors[index].read = true
        mark_read_status(id)
        this.setState({ sponsors: sponsors })
      } else {
        return
      }
    } else {
      return
    }
  }

  showAlert(type, data) {
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title={`${type == 2 ? 'Are you sure you wish to Approve this Sponsor?' : 'Are you sure you wish to Decline this Sponsor?'}`}
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='danger'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('true', type, data)}
        onCancel={() => this.hideAlert('false', type, data)}>
        You will not be able to recover this entry!
      </SweetAlert>
    )

    this.setState({
      alert: getAlert(),
    })
  }
  hideAlert = (text, type, data) => {
    this.setState({
      alert: null,
    })
    if (text == 'true') {
      this.handleActionClick(type, data)
    }
  }

  render() {
    const { active } = this.props
    const { fetching, sponsors, alert = null } = this.state

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div style={isActive} className='game__approval sponsors'>
        {alert}
        {!sponsors.length && <NoRecord title='No more updates.' linkvisible={false} />}

        <div className='gameList__box' style={{ padding: '15px' }} onScroll={this.handleScroll} ref={this.myRef}>
          {sponsors.length > 0 &&
            sponsors.map((approval, index) => {
              const time = handleTime(approval.created_at)
              return (
                <div
                  className={`notification ${
                    approval.read == undefined ? (approval.read_status == 0 ? 'unread' : '') : approval.read == false ? 'unread' : ''
                  }`}
                  key={approval.id}
                  onClick={(e) => this.handleClickNotiFication(approval.id, index)}>
                  <div className='notification-user-avatar'>
                    <Link to={`/profile/${approval.alias}`}>
                      <img onError={this.addDefaultSrc} src={approval.profile_img ? approval.profile_img : defaultUserImage} />
                    </Link>
                  </div>
                  <div className='notification-content'>
                    <div
                      className={`notification-description ${
                        approval.read == undefined ? (approval.read_status == 0 ? 'unread' : '') : approval.read == false ? 'unread' : ''
                      }`}>
                      {/* <div className='username__link'>
                        <Link to={`/profile/${approval.user_id}`}>
                          <div className='notification-username'>
                            <span> @{approval.alias}</span>
                          </div>
                        </Link>
                      </div> */}
                      {this.renderActivityText(approval)}
                    </div>
                    <div className='notification-options'>
                      <span className='notification-time'>
                        {time.countdown} {time.countdown_label} ago
                      </span>
                      <div className='notification-actions'>
                        <button
                          className='action accept'
                          onClick={(e) => {
                            e.stopPropagation()
                            this.showAlert(2, approval)
                          }}>
                          <img src='https://myG.gg/platform_images/Dashboard/btn_Like_Feed.svg' />
                          {` Approve`}
                        </button>
                        <button
                          className='action decline'
                          onClick={(e) => {
                            e.stopPropagation()
                            this.showAlert(0, approval)
                          }}>
                          <img src='https://myG.gg/platform_images/Dashboard/btn_Like_Feed.svg' />
                          {` Decline`}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          {sponsors.length > 0 && <div className='endline'>No more updates</div>}
        </div>
      </div>
    )
  }
}
