import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { logoutAction } from '../../redux/actions/userAction'
import '../styles/LeftMenuStyles.scss'
import { styles, sideBarItems, sideBarItemsOrder, logoutButton } from '../static/LeftMenu'
import { throws } from 'assert'

class LeftMenu extends Component {
  static propTypes = {
    initialData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  }

  state = {
    dropdown: false,
    show_top_btn: false,
    isExpanded: false,
    sideBarData: {
      ...sideBarItems,
    },
  }

  onMenuToggle = () => {
    this.setState((currentState) => ({
      isExpanded: !currentState.isExpanded,
      sideBarData: {
        ...sideBarItems,
      },
    }))
  }

  onItemClick = (itemKey) => {
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
    this.setState((currentState) => ({
      sideBarData: {
        ...sideBarItems,
      },
    }))
  }

  getLogoSection = () => {
    const children = this.state.isExpanded ? (
      <Fragment>
        <Link to='/'>
          <img
            src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Login+Screen/Logo_FINAL%402x.png'
            className='img-fluid'
          />
        </Link>
        <div className='sidebar-menu-toggle' onClick={this.onMenuToggle}>
          <img
            src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/btn_Uncollapse_Menu.svg'
            className='img-fluid'
          />
        </div>
      </Fragment>
    ) : (
      <Link to='/'>
        <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/logo.svg' height='32' width='32' />
      </Link>
    )

    return <div className='logo-section-container'>{children}</div>
  }

  getToggleButton = () => {
    return this.state.isExpanded ? null : (
      <div className='toggle-menu' onClick={this.onMenuToggle}>
        <img
          src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/toggle_menu_collapsed.svg'
          height='24'
          width='24'
        />
      </div>
    )
  }

  getUserSection = () => {
    const alias = this.props.initialData === 'loading' ? '' : this.props.initialData.userInfo.alias
    const profileImage = this.props.initialData === 'loading' ? '' : this.props.initialData.userInfo.profile_img
    const { isExpanded } = this.state

    return (
      <div className={classNames([isExpanded ? 'user-detail-box-expanded' : 'user-detail-box-collapsed'])}>
        {isExpanded && (
          <Link to={`/profile/${alias}`}>
            <div className='user-info-main'>
              <img src={profileImage} className='img-fluid' alt='user-picture' />
              <div className='username'>@{alias}</div>
            </div>
          </Link>
        )}
        <div className={classNames([isExpanded ? 'notification-expanded' : 'notification-collapsed'])}>
          <Link to='/invitation'>
            <div className='notification-container'>
              <img
                src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/ntfo_Friendship_Icon.svg'
                height='22'
                width='22'
                className={classNames([isExpanded ? '' : styles.notificationIconCollapsed])}
              />
              <div className='notification-box'>123</div>
              {isExpanded && <div className={styles.line} />}
            </div>
          </Link>
          <Link to='/notifications'>
            <div className='notification-container'>
              <img
                src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Bell_Icon.svg'
                height='22'
                width='22'
                className={classNames([isExpanded ? '' : styles.notificationIconCollapsed])}
              />
              <div className='notification-box'>123</div>
              {isExpanded && <div className={styles.line} />}
            </div>
          </Link>
          <Link to='/messages'>
            <div className='notification-container'>
              <img
                src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Chat_Icon.svg'
                height='22'
                width='22'
                className={classNames([isExpanded ? '' : styles.notificationIconCollapsed])}
              />
              <div className='notification-box'>123</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }

  getSubItems = (subItems) => {
    return (
      <div className={styles.subItemContainer}>
        {subItems.map((item, index) => (
          <Link
            to={item.cta}
            key={index}
            onClick={this.onSubItemClick}
            style={{ position: 'relative', display: 'block', width: '100%', height: '28px' }}>
            <div className={styles.subItemText} dangerouslySetInnerHTML={{ __html: item.header }} />
          </Link>
        ))}
      </div>
    )
  }

  getSideBarItems = () => {
    const { sideBarData, isExpanded } = this.state

    const item = (icon, expanded, subItems, header) => (
      <Fragment>
        <div className='sidebar-sub-items'>
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
          let tileCta = cta
          if (header === 'Profile') {
            const alias = this.props.initialData === 'loading' ? '' : this.props.initialData.userInfo.alias
            tileCta = tileCta + `/${alias}`
          }
          if (subItems) {
            return (
              <div
                key={itemKey}
                onClick={() => {
                  this.onItemClick(itemKey)
                }}>
                {item(icon, expanded, subItems, header)}
              </div>
            )
          } else {
            return (
              <Link key={itemKey} to={tileCta}>
                {item(icon, expanded, subItems, header)}
              </Link>
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
              window.location.href = '/logout'
            }}
            className='logout-text'>
            <img src={logoutButton.icon} className='img-fluid' />
            {this.state.isExpanded && <p>{logoutButton.header}</p>}
          </div>
          {this.state.isExpanded && (
            <Link to='/mySettings'>
              <img
                src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Settings_Chat_Window.svg'
                className='img-fluid'
              />
            </Link>
          )}
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <Fragment>
        <div className={` ${!this.state.isExpanded ? 'sidebar-container-collapsed' : 'sidebar-container'}`}>
          {this.getLogoSection()}
          {this.getToggleButton()}
          {this.getUserSection()}
          {this.getSideBarItems()}
          {this.getLogout()}
        </div>
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
