import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FeatureEnabled, checkFlag, CHANNEL } from '../../../common/flags'
import { logoutAction } from '../../../redux/actions/userAction'
import { closeMobileMenuAction } from '../../../redux/actions/mobileMenuAction'
import NotificationIcon from '../Notifications/Icon'

const MobileMenuTop = (props) => {
  const { initialData, notifications } = props
  const [hideSideMenu, setHideSideMenu] = useState(false)
  const dispatch = useDispatch()
  const mobileMenuIsActive = useSelector((state) => state.mobileMenu.mobileMenuIsActive)

  const alias = initialData === 'loading' ? '' : initialData.userInfo.alias

  const profileImage =
    initialData === 'loading' ? 'invalid_link' : initialData.userInfo.profile_img ? initialData.userInfo.profile_img : 'invalid_link'

  const level = initialData === 'loading' ? 0 : initialData.userInfo.level

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/platform_images/Dashboard/logo.svg'
  }

  const hideMenus = () => {
    setHideSideMenu(false)
    dispatch(closeMobileMenuAction())
  }

  return (
    <Fragment>
      <div className={mobileMenuIsActive ? 'menu-tab show' : 'menu-tab hide'}>
        <img onClick={() => setHideSideMenu(true)} src='https://myG.gg/platform_images/Dashboard/logo.svg' className='img-fluid logo-img' />
        <div className={'notification-expanded'}>
          <Link to='/?at=notifications&submenu=1' style={{ marginLeft: 16 }}>
            <div className='notification-container'>
              <img src='https://myG.gg/platform_images/Dashboard/ntfo_Friendship_Icon.svg' height='22' width='22' />
              <NotificationIcon type='approvals' />
            </div>
          </Link>
          <Link to='/?at=notifications&submenu=2'>
            <div className='notification-container'>
              <img src='https://myG.gg/platform_images/Dashboard/Bell_Icon.svg' height='22' width='22' />
              <NotificationIcon type='alerts' />
            </div>
          </Link>
          <Link to='/?at=notifications&submenu=3' style={{ paddingRight: checkFlag(CHANNEL) ? 35 : 16 }}>
            <div className='notification-container'>
              <img src='https://myG.gg/platform_images/Dashboard/Chat_Icon.svg' height='22' width='22' />
              <NotificationIcon type='chats' />
            </div>
          </Link>
          <FeatureEnabled allOf={[CHANNEL]}>
            <Link to='/myg-chat' style={{ paddingRight: 20 }}>
              <div className='notification-container'>
                <img src='https://myg.gg/platform_images/Dashboard/Viw.svg' height='22' width='22' />
                <NotificationIcon type='channel' />
              </div>
            </Link>
          </FeatureEnabled>
        </div>
      </div>
      {hideSideMenu && (
        <Fragment>
          <div className='mobile-top-menu-dropdown'>
            <div className='mobile-side-menu'>
              <div className='mobile-side-menu-top'>
                <div className='back-btn'>
                  <img src='https://myG.gg/platform_images/Dashboard/btn_Uncollapse_Menu.svg' onClick={() => setHideSideMenu(false)} />
                </div>
                <div className='user-name-icon'>
                  <Link to={`/profile/${alias}`} onClick={() => setHideSideMenu(false)}>
                    <div className='user-icon'>
                      <img onError={addDefaultSrc} src={profileImage} className='img-fluid' alt='user-picture' />
                    </div>
                    <div className='user-name'>@{alias}</div>
                  </Link>
                </div>
                <div className='level-information'>
                  <div className='level-wrapper'>
                    <span className='level'>level</span>
                    <br />
                    <span className='level-numer'>{level}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='menu-list'>
              <ul>
                <li>
                  <Link to='/' onClick={() => setHideSideMenu(false)}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to='/?at=communities' onClick={() => setHideSideMenu(false)}>
                    Communities
                  </Link>
                </li>
                <li>
                  <Link to='/?at=notifications&submenu=0' onClick={() => setHideSideMenu(false)}>
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link to='/?at=mygames' onClick={() => hideMenus()}>
                    My Games
                  </Link>
                </li>
                <li>
                  <Link to={`/profile/${alias}`} onClick={() => setHideSideMenu(false)}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to='/achievements/badges' onClick={() => setHideSideMenu(false)}>
                    Achievements
                  </Link>
                </li>
              </ul>
            </div>
            <div className='logout-setting-section'>
              <div
                className='logout-btn'
                onClick={() => {
                  setHideSideMenu(false)
                  dispatch(logoutAction())
                  window.location.href = '/logout'
                }}>
                <img src='https://myG.gg/platform_images/Dashboard/Logout_Icon.svg' />
                <span>Logout</span>
              </div>
              <div className='setting-btn'>
                <Link to='/?at=notifications&submenu=6' onClick={() => setHideSideMenu(false)}>
                  <img src='https://myG.gg/platform_images/Dashboard/Settings_Chat_Window.svg' />
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default MobileMenuTop
