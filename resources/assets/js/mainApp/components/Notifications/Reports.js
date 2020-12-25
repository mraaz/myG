import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import TopTabs from './TopTabs'
import { clickedDeletePost, clickedDeleteReport, handleTime } from './helperFunction'
import { Toast_style } from '../Utility_Function'
import { toast } from 'react-toastify'
import NoRecord from './NoRecord'
const defaultUserImage = 'https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png'

export default class Reports extends Component {
  constructor() {
    super()
    this.state = {
      fetching: false,
      reports: [],
      moreplease: true,
      counter: 1,
      tab: 0,
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
      clickedDeletePost(data)
    } else {
      clickedDeleteReport(data)
    }
    const filterReports = reports.filter((report) => report.id != data.id)
    this.setState({ reports: filterReports }, () => {
      this.props.setNotificationsCount(this.state.reports.length)
    })
    toast.success(<Toast_style text={`Yeah! you have successfully ${type} the request.`} />)
  }

  renderActivityText = (props) => {
    const { activity_type } = props
    let activity_name = ''
    return (
      <div className='notification__text'>
        {` has reported.`}{' '}
        <Link to={`/post/${props.post_id}`}>
          <span className='notification-type'>{props.name}</span>
        </Link>
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
      <div style={isActive} className='game__approval'>
        <TopTabs tabs={['All']} changeTab={this.changeTab} />

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
                    <Link to={`/profile/${report.alias}`}>
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
                        {report.second_user_alias && ` and `}
                        {report.second_user_alias && (
                          <Link to={`/profile/${report.second_user_alias}`}>
                            <div className='notification-username'>
                              <span> @{report.second_user_alias}</span>
                            </div>
                          </Link>
                        )}
                      </div>
                      {this.renderActivityText(report)}
                    </div>
                    <div className='notification-options'>
                      <span className='notification-time'>
                        {time.countdown} {time.countdown_label} ago
                      </span>
                      <div className='notification-actions'>
                        <button className='action decline' onClick={(e) => this.handleActionClick('report', report)}>
                          {/* <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Like_Feed.svg' /> */}
                          {` Delete Report `}
                        </button>
                        <button className='action decline' onClick={(e) => this.handleActionClick('post', report)}>
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
