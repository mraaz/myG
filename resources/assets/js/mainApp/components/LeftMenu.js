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
    initialData: PropTypes.object.isRequired,
  }

  state = {
    dropdown: false,
    show_top_btn: false,
    isExpanded: true,
    sideBarData: sideBarItems,
  }

  onMenuToggle = () => {
    this.setState((currentState) => ({
      isExpanded: !currentState.isExpanded,
      sideBarData: sideBarItems,
    }))
  }

  onItemClick = (itemKey) => {
    this.setState((prevState) => ({
      sideBarData: {
        ...prevState.sideBarData,
        [itemKey]: {
          ...prevState.sideBarData[itemKey],
          expanded: !prevState.sideBarData[itemKey].expanded,
        },
      },
    }))
  }

  getLogoSection = () => {
    const children = this.state.isExpanded ? (
      <Fragment>
        <img
          src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Login+Screen/Logo_FINAL%402x.png'
          height='107'
          width='191'
        />
        <div className={styles.logoButton} onClick={this.onMenuToggle}>
          <img
            src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/toggle_menu_collapsed.svg'
            height='20'
            width='20'
          />
        </div>
      </Fragment>
    ) : (
      <img
        src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/logo.svg'
        className={styles.logoCollapsed}
        height='32'
        width='32'
      />
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
    const { isExpanded } = this.state

    return (
      <div className={classNames([styles.userDetailsBox, isExpanded ? '' : styles.userDetailsBoxCollapsed])}>
        {isExpanded && (
          <div className={styles.userInfo}>
            <img className={styles.userDp} />
            <div className={styles.userAlias}>@{alias}</div>
          </div>
        )}
        <div className={classNames([styles.notificationContainer, isExpanded ? '' : styles.notificationContainerCollapsed])}>
          <img
            src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/toggle_menu_collapsed.svg'
            height='24'
            width='24'
            className={classNames([styles.notificationIcon, isExpanded ? '' : styles.notificationIconCollapsed])}
          />
          <div />
          <img
            src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/toggle_menu_collapsed.svg'
            height='24'
            width='24'
            className={classNames([styles.notificationIcon, isExpanded ? '' : styles.notificationIconCollapsed])}
          />
          <img
            src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/toggle_menu_collapsed.svg'
            height='24'
            width='24'
            className={classNames([styles.notificationIcon, isExpanded ? '' : styles.notificationIconCollapsed])}
          />
        </div>
      </div>
    )
  }

  getSubItems = (subItems) => {
    return (
      <div className={styles.subItemContainer}>
        {subItems.map((item) => (
          <div className={styles.subItemText} dangerouslySetInnerHTML={{ __html: item.header }} />
        ))}
      </div>
    )
  }

  getSideBarItems = () => {
    const { sideBarData, isExpanded } = this.state

    return (
      <Fragment>
        {sideBarItemsOrder.map((itemKey) => {
          const { icon, header, expanded, subItems } = sideBarData[itemKey]
          return (
            <Fragment>
              <div>
                <div className={styles.itemBox}>
                  <img src={icon} height='24' width='24' />
                  {isExpanded && <div className={styles.sidebarItemText}>{header}</div>}
                </div>
              </div>
              {expanded && subItems && this.getSubItems(subItems)}
            </Fragment>
          )
        })}
      </Fragment>
    )
  }

  getLogout = () => {
    return (
      <Fragment>
        <div className={classNames([styles.itemBox, styles.logout])}>
          <img src={logoutButton.icon} height='24' width='24' className={styles.sideBarItemIcon} />
          {this.state.isExpanded && <div className={styles.sidebarItemText}>{logoutButton.header}</div>}
          {this.state.isExpanded && (
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Settings_Chat_Window.svg'
              height='24'
              width='24'
              className={styles.settingsIcon}
            />
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
