import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import TopTabs from './TopTabs'
import { deleteGamer, banGamer, handleTime } from './helperFunction'
import { Toast_style } from '../Utility_Function'
import { toast } from 'react-toastify'
import NoRecord from './NoRecord'
const defaultUserImage = 'https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png'

export default class ReportedUsers extends Component {
  constructor() {
    super()
    this.state = {
      fetching: false,
      reportedUsers: [],
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
    const getReportedUsers = await axios.get(`/api/reported/${counter}`)

    if (getReportedUsers.data.length > 0) {
      this.setState({ reportedUsers: getReportedUsers.data, fetching: false }, () => {
        this.props.setNotificationsCount(this.state.reportedUsers.length)
      })
    }
  }

  getMoreNotification = async () => {
    const { counter, reports = [] } = this.state
    let count = counter + 1
    this.setState({ fetching: true })
    const getReportedUsers = await axios.get(`/api/reported/${counter}`)

    if (getReportedUsers.data && getReportedUsers.data.length == 0) {
      this.setState({
        moreplease: false,
        fetching: false,
      })
      return
    }
    if (getReportedUsers.data && getReportedUsers.data.length > 0) {
      if (count > 1) {
        this.setState({ reportedUsers: [...reportedUsers, ...getReportedUsers.data], counter: count, fetching: false }, () => {
          this.props.setNotificationsCount(this.state.reportedUsers.length)
        })
      } else {
        this.setState({ reportedUsers: getReportedUsers.data, fetching: false }, () => {
          this.props.setNotificationsCount(this.state.reportedUsers.length)
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
    const { reportedUsers } = this.state
    if (type == 'deleteGamer') {
      deleteGamer(data)
    } else {
      banGamer(data)
    }
    const filterReports = reportedUsers.filter((report) => report.id != data.id)
    this.setState({ reportedUsers: filterReports }, () => {
      this.props.setNotificationsCount(this.state.reportedUsers.length)
    })
    toast.success(<Toast_style text={`Yeah! you have successfully ${type} the request.`} />)
  }

  renderReportedText = (props) => {
    const { first_offence, second_offence, third_offence, first_offence_date, second_offence_date, third_offence_date, counter } = props
    return (
      <div className='notification__text'>
        {`${counter} time${counter > 1 ? '(s)' : ''}`}
        {first_offence && <div className='notification-type'>{`${first_offence} | ${moment(first_offence_date).format('lll')}`}</div>}
        {second_offence && <div className='notification-type'>{`${second_offence} | ${moment(second_offence_date).format('lll')}`}</div>}
        {third_offence && <div className='notification-type'>{`${third_offence} | ${moment(third_offence_date).format('lll')}`}</div>}
      </div>
    )
  }

  addDefaultSrc(ev) {
    ev.target.src = 'https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png'
  }

  handleClickNotiFication = (id, index) => {
    let { reportedUsers = [] } = this.state

    if (reportedUsers.length > 0 && reportedUsers[index].read_status != 1) {
      if (reportedUsers[index].read == undefined || reportedUsers[index].read == false) {
        reportedUsers[index].read = true
        mark_read_status(id)
        this.setState({ reportedUsers })
      } else {
        return
      }
    } else {
      return
    }
  }

  render() {
    const { active } = this.props
    const { fetching, reportedUsers } = this.state

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div style={isActive} className='game__reportedUser'>
        <TopTabs tabs={['All']} changeTab={this.changeTab} />

        {!reportedUsers.length && <NoRecord title='No more updates.' linkvisible={false} />}

        <div className='gameList__box' style={{ padding: '15px' }} onScroll={this.handleScroll} ref={this.myRef}>
          {reportedUsers.length > 0 &&
            reportedUsers.map((report, index) => {
              const time = handleTime(report.created_at)
              return (
                <div
                  className={`notification ${
                    report.read == undefined ? (report.read_status == 0 ? 'unread' : '') : report.read == false ? 'unread' : ''
                  }`}
                  key={report.id}
                  onClick={(e) => this.handleClickNotiFication(report.id, index)}>
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
                            <span> @{report.alias}</span>
                          </div>
                        </Link>
                      </div>
                      {this.renderReportedText(report)}
                    </div>
                    <div className='notification-options'>
                      <span className='notification-time'>
                        {time.countdown} {time.countdown_label} ago
                      </span>
                      <div className='notification-actions'>
                        <button className='action decline' onClick={(e) => this.handleActionClick('deleteGamer', report)}>
                          {/* <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Like_Feed.svg' /> */}
                          {` Delete Gamer `}
                        </button>
                        <button className='action decline' onClick={(e) => this.handleActionClick('banGamer', report)}>
                          {/* <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Like_Feed.svg' /> */}
                          {` Ban Gamer `}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          {reportedUsers.length > 0 && <div className='endline'>No more updates</div>}
        </div>
      </div>
    )
  }
}
