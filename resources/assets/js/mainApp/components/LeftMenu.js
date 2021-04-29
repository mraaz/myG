import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import axios from 'axios'

import { logoutAction } from '../../redux/actions/userAction'
import '../styles/LeftMenuStyles.scss'
import { styles, sideBarItems, sideBarItemsOrder, logoutButton } from '../static/LeftMenu'
import NotificationIcon from './Notifications/Icon'

class LeftMenu extends Component {
  static propTypes = {
    initialData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  }

  async componentDidMount() {
    let expanded = localStorage.getItem('isExpanded')

    const getnoti = await axios.post('/api/notifications_v2/getUnread_count', {
      notification_type: -1,
    })

    const chat_noti = await axios.get('/api/chat/message/unread?count=true')

    if (chat_noti.data) {
      this.setState({ chats: chat_noti.data.unreadMessages ? chat_noti.data.unreadMessages : 0 })
    }

    if (getnoti.data) {
      const { getUnread_count_Alerts = 0, getUnread_count_Approvals = 0 } = getnoti.data
      this.setState({ alerts: getUnread_count_Alerts, approvals: getUnread_count_Approvals })
    }

    if (expanded == 'true') {
      this.setState({ isExpanded: true })
    }
  }

  state = {
    dropdown: false,
    isExpanded: false,
    sideBarData: {
      ...sideBarItems,
    },
    approvals: 0,
    alerts: 0,
    chats: 0,
    activePage: '',
  }

  setExpandedDefault = function (data) {
    Object.keys(data).forEach(function (key) {
      data[key]['expanded'] = false
    })
    return data
  }

  updateActivePage = (page) => {
    const { sideBarData = {} } = this.state

    switch (page) {
      case 'FEED':
        this.setState({ activePage: 'Dashboard' })
        break
      case 'ACHIEVEMENTS':
        this.setState({ activePage: 'Achievements' })
        break
      case 'PROFILE':
        this.setState({ activePage: 'Profile' })
        break
      default:
        this.setState({ activePage: '' })
    }
    const sideBar = this.setExpandedDefault(sideBarData)
    this.setState({ sideBarData: sideBar })
  }

  onMenuToggle = () => {
    localStorage.setItem('isExpanded', !this.state.isExpanded)
    this.setState((currentState) => ({
      isExpanded: !currentState.isExpanded,
      sideBarData: {
        ...sideBarItems,
      },
    }))
  }

  onItemClick = (itemKey) => {
    this.updateActivePage(itemKey)
    this.setState((prevState) => ({
      isExpanded: true,
      sideBarData: {
        ...prevState.sideBarData,
        [itemKey]: {
          ...prevState.sideBarData[itemKey],
          expanded: !prevState.sideBarData[itemKey].expanded,
        },
      },
    }))
  }

  onSubItemClick = (e) => {
    e.stopPropagation()
    this.updateActivePage('')
    let expanded = localStorage.getItem('isExpanded')
    if (expanded == 'true') {
      expanded = true
    } else {
      expanded = false
    }

    this.setState((currentState) => ({
      sideBarData: {
        ...sideBarItems,
      },
      isExpanded: expanded,
    }))
  }

  getLogoSection = () => {
    const children = this.state.isExpanded ? (
      <Fragment>
        <Link to='/' onClick={(e) => this.updateActivePage('')}>
          <img src='https://myG.gg/platform_images/Login+Screen/Logo_FINAL%402x.png' className='img-fluid' />
        </Link>
        <div className='sidebar-menu-toggle' onClick={this.onMenuToggle}>
          <img src='https://myG.gg/platform_images/Dashboard/btn_Uncollapse_Menu.svg' className='img-fluid' />
        </div>
      </Fragment>
    ) : (
      <Link to='/' onClick={(e) => this.updateActivePage('')}>
        <img src='https://myG.gg/platform_images/Dashboard/logo.svg' height='32' width='32' />
      </Link>
    )

    return <div className='logo-section-container'>{children}</div>
  }

  getToggleButton = () => {
    return this.state.isExpanded ? null : (
      <div className='toggle-menu' onClick={this.onMenuToggle}>
        <img src='https://myG.gg/platform_images/Dashboard/toggle_menu_collapsed.svg' height='24' width='24' />
      </div>
    )
  }

  addDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/default_user/new-user-profile-picture.png'
  }

  getUserSection = () => {
    const alias = this.props.initialData === 'loading' ? '' : this.props.initialData.userInfo.alias
    const profileImage =
      this.props.initialData === 'loading'
        ? 'invalid_link'
        : this.props.initialData.userInfo.profile_img
          ? this.props.initialData.userInfo.profile_img
          : 'invalid_link'
    const { isExpanded, approvals = 0, chats = 0, alerts = 0 } = this.state
    return (
      <div className={classNames([isExpanded ? 'user-detail-box-expanded' : 'user-detail-box-collapsed'])}>
        {isExpanded && (
          <Link to={`/profile/${alias}`}>
            <div className='lm-user-info-main'>
              <img onError={this.addDefaultSrc} src={profileImage} className='profile-image img-fluid' alt='user-picture' />
              <div className='lm-username'>@{alias}</div>
            </div>
          </Link>
        )}
        <div className={classNames([isExpanded ? 'notification-expanded' : 'notification-collapsed'])}>
          <Link to='/?at=notifications&submenu=1'>
            <div className='notification-container'>
              <img
                src='https://myG.gg/platform_images/Dashboard/ntfo_Friendship_Icon.svg'
                height='22'
                width='22'
                className={classNames([isExpanded ? '' : styles.notificationIconCollapsed])}
              />
              <NotificationIcon type='approvals' />
              {isExpanded && <div className={styles.line} />}
            </div>
          </Link>
          <Link to='/?at=notifications&submenu=2'>
            <div className='notification-container'>
              <img
                src='https://myG.gg/platform_images/Dashboard/Bell_Icon.svg'
                height='22'
                width='22'
                className={classNames([isExpanded ? '' : styles.notificationIconCollapsed])}
              />
              <NotificationIcon type='alerts' />
              {isExpanded && <div className={styles.line} />}
            </div>
          </Link>
          <Link to='/?at=notifications&submenu=3'>
            <div className='notification-container'>
              <img
                src='https://myG.gg/platform_images/Dashboard/Chat_Icon.svg'
                height='22'
                width='22'
                className={classNames([isExpanded ? '' : styles.notificationIconCollapsed])}
              />
              <NotificationIcon type='chats' />
            </div>
          </Link>
        </div>
      </div>
    )
  }

  getSubItems = (subItems) => {
    return (
      <div className='sidebar-sub-menu'>
        {subItems.map((item, index) => (
          <Link to={item.cta} key={index} onClick={this.onSubItemClick}>
            <div className='menu-item' dangerouslySetInnerHTML={{ __html: item.header }} />
          </Link>
        ))}
      </div>
    )
  }

  getSideBarItems = () => {
    const { sideBarData, isExpanded, activePage } = this.state

    const item = (icon, expanded, subItems, header, activePageId) => (
      <Fragment>
        <div className={`sidebar-sub-items${activePageId === header ? ' active' : ''}`}>
          <img src={icon} className='img-fluid' />
          {isExpanded && <p>{header}</p>}
        </div>
        {expanded && this.getSubItems(subItems)}
      </Fragment>
    )

    return (
      <Fragment>
        {sideBarItemsOrder.map((itemKey) => {
          const { icon, header, expanded, subItems, cta } = sideBarData[itemKey]
          const activePageId = activePage
          let tileCta = cta
          if (header === 'Profile') {
            const alias = this.props.initialData === 'loading' ? '' : this.props.initialData.userInfo.alias
            tileCta = tileCta + `/${alias}`
          }
          if (subItems) {
            return (
              <div key={itemKey} onClick={() => this.onItemClick(itemKey)}>
                {item(icon, expanded, subItems, header, activePageId)}
              </div>
            )
          } else {
            return (
              <div key={itemKey} onClick={() => this.updateActivePage(itemKey)}>
                <Link to={tileCta} className='side-menu-anchor'>
                  {item(icon, expanded, subItems, header, activePageId)}
                </Link>
              </div>
            )
          }
        })}
      </Fragment>
    )
  }

  getLogout = () => {
    return (
      <Fragment>
        <div className='logout-btn-main'>
          <div
            onClick={() => {
              this.props.logout()
              //window.router.push('/logout');
              window.location.href = '/logout'
            }}
            className={`logout-text${this.state.isExpanded ? ' margin-right' : ''}`}>
            <img src={logoutButton.icon} className='img-fluid' />
            {this.state.isExpanded && <p>{logoutButton.header}</p>}
          </div>
          {this.state.isExpanded && (
            <Link to='/?at=notifications&submenu=6'>
              <img src='https://myG.gg/platform_images/Dashboard/Settings_Chat_Window.svg' className='img-fluid' />
            </Link>
          )}
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <Fragment>
        <section id='main-sidebar' className={`${!this.state.isExpanded ? 'main-sidebar-collapsed' : 'main-sidebar-expanded'}`}>
          <div className={`${!this.state.isExpanded ? 'sidebar-container-collapsed' : 'sidebar-container'}`}>
            {this.getLogoSection()}
            {this.getToggleButton()}
            {this.getUserSection()}
            {this.getSideBarItems()}
            {this.getLogout()}
          </div>
        </section>
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
  }
}

export default connect(null, mapDispatchToProps)(withRouter(LeftMenu))
