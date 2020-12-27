import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import TopTabs from './TopTabs'
import { deleteReportedPost, deleteReportNotification, handleTime, mark_read_status } from './helperFunction'
import { Toast_style } from '../Utility_Function'
import { toast } from 'react-toastify'
import NoRecord from './NoRecord'
const defaultUserImage = 'https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png'
import SweetAlert from '../common/MyGSweetAlert'

export default class Reports extends Component {
  constructor() {
    super()
    this.state = {
      fetching: false,
      reports: [],
      moreplease: true,
      counter: 1,
      tab: 0,
      alert: null,
    }
    this.myRef = React.createRef()
  }

  componentDidMount = async () => {
    document.title = 'myG - Notification'
    const { counter } = this.state
    window.scrollTo(0, 0)
    this.setState({ fetching: true })
    const getReports = await axios.get(`/api/report/${counter}`)

    if (getReports.data.length > 0) {
      this.setState({ reports: getReports.data, fetching: false }, () => {
        this.props.setNotificationsCount(this.state.reports.length)
      })
    }
  }

  showAlert = (type, data) => {
    const getAlert = (type, data) => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to delete this ?'
        confirmBtnText='Make it so!'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={false}
        btnSize='lg'
        style={{
          display: 'flex',
          whiteSpace: 'pre',
          width: '41%',
        }}
        onConfirm={() => this.hideAlert(type, data, 'true')}
        onCancel={() => this.hideAlert(type, data, 'false')}>
        You will not be able to recover this entry!
      </SweetAlert>
    )

    this.setState({
      alert: getAlert(type, data),
    })
  }

  hideAlert = (type, data, text) => {
    this.setState({
      alert: null,
    })
    if (text == 'true') {
      this.handleActionClick(type, data)
    }
  }

  getMoreNotification = async () => {
    const { counter, reports = [] } = this.state
    let count = counter + 1
    this.setState({ fetching: true })
    const getReports = await axios.get(`/api/report/${counter}`)

    if (getReports.data && getReports.data.length == 0) {
      this.setState({
        moreplease: false,
        fetching: false,
      })
      return
    }
    if (getReports.data && getReports.data.length > 0) {
      if (count > 1) {
        this.setState({ reports: [...reports, ...getReports.data], counter: count, fetching: false }, () => {
          this.props.setNotificationsCount(this.state.reports.length)
        })
      } else {
        this.setState({ reports: getReports.data, fetching: false }, () => {
          this.props.setNotificationsCount(this.state.reports.length)
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
    const { reports } = this.state
    if (type == 'post') {
      deleteReportedPost(data)
    } else {
      deleteReportNotification(data)
    }
    mark_read_status(data.id)
    const filterReports = reports.filter((report) => report.id != data.id)
    this.setState({ reports: filterReports }, () => {
      this.props.setNotificationsCount(this.state.reports.length)
    })
    toast.success(<Toast_style text={`Yeah! you have successfully ${type} the request.`} />)
  }

  renderReportedText = (props) => {
    return (
      <div className='notification__text'>
        {` has reported.`}{' '}
        {props.post_id && (
          <Link to={`/post/${props.post_id}`}>
            <span className='notification-type'>{'Post'}</span>
          </Link>
        )}
        {props.comment_id && (
          <Link to={`/post/${props.post_id}`}>
            <span className='notification-type'>{'Comment'}</span>
          </Link>
        )}
        {props.reply_id && (
          <Link to={`/post/${props.post_id}`}>
            <span className='notification-type'>{'Reply'}</span>
          </Link>
        )}
      </div>
    )
  }

  addDefaultSrc(ev) {
    ev.target.src = 'https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png'
  }

  handleClickNotiFication = (id, index) => {
    let { reports = [] } = this.state

    if (reports.length > 0 && reports[index].read_status != 1) {
      if (reports[index].read == undefined || reports[index].read == false) {
        reports[index].read = true
        mark_read_status(id)
        this.setState({ reports })
      } else {
        return
      }
    } else {
      return
    }
  }

  render() {
    const { active } = this.props
    const { fetching, reports } = this.state

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div style={isActive} className='game__report'>
        <TopTabs tabs={['All']} changeTab={this.changeTab} />
        {this.state.alert}
        {!reports.length && <NoRecord title='No more updates.' linkvisible={false} />}

        <div className='gameList__box' style={{ padding: '15px' }} onScroll={this.handleScroll} ref={this.myRef}>
          {reports.length > 0 &&
            reports.map((report, index) => {
              const time = handleTime(report.created_at)
              return (
                <div
                  className={`notification ${
                    report.read == undefined ? (report.read_status == 0 ? 'unread' : '') : report.read == false ? 'unread' : ''
                  }`}
                  key={report.id}
                  onClick={(e) => this.handleClickNotiFication(report.id, index)}>
                  >
                  <div className='notification-user-avatar'>
                    <Link to={`/profile/${report.owner_alias}`}>
                      <img onError={this.addDefaultSrc} src={report.profile_img ? report.profile_img : defaultUserImage} />
                    </Link>
                  </div>
                  <div className='notification-content'>
                    <div
                      className={`notification-description ${
                        report.read == undefined ? (report.read_status == 0 ? 'unread' : '') : report.read == false ? 'unread' : ''
                      }`}>
                      <div className='username__link'>
                        <Link to={`/profile/${report.first_user_alias}`}>
                          <div className='notification-username'>
                            <span> @{report.first_user_alias}</span>
                          </div>
                        </Link>
                        {report.second_user_alias && <span className='gapfill'> and </span>}
                        {report.second_user_alias && (
                          <Link to={`/profile/${report.second_user_alias}`}>
                            <div className='notification-username'>
                              <span> @{report.second_user_alias}</span>
                            </div>
                          </Link>
                        )}
                      </div>
                      {this.renderReportedText(report)}
                    </div>
                    <div className='notification-options'>
                      <span className='notification-time'>
                        {time.countdown} {time.countdown_label} ago
                      </span>
                      <div className='notification-actions'>
                        <button className='action decline' onClick={(e) => this.showAlert('report', report)}>
                          {/* <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Like_Feed.svg' /> */}
                          {` Delete Report `}
                        </button>
                        <button className='action decline' onClick={(e) => this.showAlert('post', report)}>
                          {/* <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Like_Feed.svg' /> */}
                          {` Delete Post `}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          {reports.length > 0 && <div className='endline'>No more updates</div>}
        </div>
      </div>
    )
  }
}
