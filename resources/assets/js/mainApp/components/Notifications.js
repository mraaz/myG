import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import IndividualNotification from './IndividualNotification'
import SweetAlert from 'react-bootstrap-sweetalert'
import InfiniteScroll from 'react-infinite-scroll-component'

export default class Notifications extends Component {
  constructor() {
    super()
    this.state = { alert: null, moreplease: true, counter: 0, myNoti: [] }
  }

  componentDidMount() {
    this.pullData()
  }

  pullData = async () => {
    this.state.counter = this.state.counter + 1

    if (this.state.counter != 1) {
      this.setState({
        show_top_btn: true,
      })
    }

    try {
      const getnoti = await axios.post('/api/notifications/getAllNoti', {
        counter: this.state.counter,
      })

      if (getnoti.data.length == 0) {
        this.setState({
          moreplease: false,
        })
        return
      }

      this.setState({
        myNoti: this.state.myNoti.concat(getnoti.data),
      })
    } catch (error) {
      console.log(error)
    }
  }

  showNotifications = () => {
    if (this.state.myNoti != undefined) {
      const rowLen = this.state.myNoti.length
      var lastRow = false
      if (rowLen == 0) {
        return <div className='notifications-info'>No notifications</div>
      }
      return this.state.myNoti.map((item, index) => {
        if (rowLen === index + 1) {
          lastRow = true
        }
        return <IndividualNotification userId={this.props.initialData.userInfo.id} notification={item} key={index} lastRow={lastRow} />
      })
    }
  }

  mark_all = () => {
    try {
      const mark_all = axios.get('/api/notifications/markAllNoti')
    } catch (error) {
      console.log(error)
    }
    window.location.reload()
  }

  delete_all = () => {
    try {
      const delete_all = axios.get('/api/notifications/deleteAllNoti')
    } catch (error) {
      console.log(error)
    }
    window.location.reload()
  }

  showAlert() {
    const getAlert = () => (
      <SweetAlert
        success
        showCancel
        title='Are you sure you wish to Mark ALL as Read?'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='success'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('true')}
        onCancel={() => this.hideAlert('false')}></SweetAlert>
    )

    this.setState({
      alert: getAlert(),
    })
  }

  showAlert_delete_all() {
    const getAlert = () => (
      <SweetAlert
        success
        showCancel
        title='Are you sure you wish to Delete ALL notifications?'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='success'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('delete_true')}
        onCancel={() => this.hideAlert('false')}></SweetAlert>
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
      this.mark_all()
    } else if (text == 'delete_true') {
      this.delete_all()
    }
  }

  render() {
    if (this.state.myNoti != undefined) {
      var show_buttons = false

      if (this.state.myNoti.length > 0) {
        show_buttons = true
      }

      return (
        <section id='notifications-page'>
          <div className='content-area notifications-page'>
            {this.state.alert}
            <div className='padding-container'>
              <div className='notifications-grey-container'>
                <h3>myNotifications</h3>
                {show_buttons && (
                  <div className='noti-buttons'>
                    <button className='allread' onClick={() => this.showAlert()}>
                      Mark all as read
                    </button>
                    <button className='deleteall' onClick={() => this.showAlert_delete_all()}>
                      Delete All
                    </button>
                  </div>
                )}
                <div className='padding-container'></div>
                <div className='notifications-container'>
                  <InfiniteScroll dataLength={this.state.myNoti.length} next={this.pullData} hasMore={this.state.moreplease}>
                    {this.showNotifications()}
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    } else {
      return <div className='content-area notifications-page'>Loading</div>
    }
  }
}
