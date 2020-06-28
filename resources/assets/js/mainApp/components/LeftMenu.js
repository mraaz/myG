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
            height='107'
            width='191'
          />
        </Link>
        <div className={styles.logoButton} onClick={this.onMenuToggle}>
          <img
            src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/btn_Uncollapse_Menu.svg'
            height='20'
            width='20'
          />
        </div>
      </Fragment>
    ) : (
      <Link to='/'>
        <img
          src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/logo.svg'
          className={styles.logoCollapsed}
          height='32'
          width='32'
        />
      </Link>
    )

    return <div className={styles.logoSectionContainer}>{children}</div>
  }

  getToggleButton = () => {
    return this.state.isExpanded ? null : (
      <div className={classNames([styles.itemBox, styles.toggleIcon])} onClick={this.onMenuToggle}>
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
      <div className={classNames([styles.userDetailsBox, isExpanded ? '' : styles.userDetailsBoxCollapsed])}>
        {isExpanded && (
          <Link to={`/profile/${alias}`}>
            <div className={styles.userInfo}>
              <img src={profileImage} className={styles.userDp} />
              <div className={styles.userAlias}>@{alias}</div>
            </div>
          </Link>
        )}
        <div className={classNames([styles.notificationContainer, isExpanded ? '' : styles.notificationContainerCollapsed])}>
          <Link to='/invitation'>
            <div className={styles.notificationIcon}>
              <img
                src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/ntfo_Friendship_Icon.svg'
                height='22'
                width='22'
                className={classNames([isExpanded ? '' : styles.notificationIconCollapsed])}
              />
              <div className={styles.notificationArea}>123</div>
              {isExpanded && <div className={styles.line} />}
            </div>
          </Link>
          <Link to='/notifications'>
            <div className={styles.notificationIcon}>
              <img
                src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Bell_Icon.svg'
                height='22'
                width='22'
                className={classNames([isExpanded ? '' : styles.notificationIconCollapsed])}
              />
              <div className={styles.notificationArea}>123</div>
              {isExpanded && <div className={styles.line} />}
            </div>
          </Link>
          <Link to='/messages'>
            <div className={styles.notificationIcon}>
              <img
                src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Chat_Icon.svg'
                height='22'
                width='22'
                className={classNames([isExpanded ? '' : styles.notificationIconCollapsed])}
              />
              <div className={styles.notificationArea}>123</div>
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
        <div className={styles.itemBox}>
          <img src={icon} height='24' width='24' />
          {isExpanded && <div className={styles.sidebarItemText}>{header}</div>}
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
        <div className={classNames([styles.itemBox, styles.logout])}>
          <div
            onClick={() => {
              this.props.logout()
              window.location.href = '/logout'
            }}
            className={styles.logoutArea}>
            <img src={logoutButton.icon} height='24' width='24' className={styles.sideBarItemIcon} />
            {this.state.isExpanded && <div className={styles.sidebarItemText}>{logoutButton.header}</div>}
          </div>
          {this.state.isExpanded && (
            <Link to='/mySettings'>
              <img
                src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Settings_Chat_Window.svg'
                height='31'
                width='31'
                className={styles.settingsIcon}
              />
            </Link>
          )}
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <div className={classNames([styles.container, !this.state.isExpanded ? styles.menuCollapsed : ''])}>
        {this.getLogoSection()}
        {this.getToggleButton()}
        {this.getUserSection()}
        {this.getSideBarItems()}
        {this.getLogout()}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
  }
}

export default connect(null, mapDispatchToProps)(withRouter(LeftMenu))
