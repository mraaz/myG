import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../../../redux/actions/userAction'
import NotificationIcon from '../Notifications/Icon'

const MobileMenuTop = (props) => {
  const { initialData, notifications, hide } = props
  const [hideSideMenu, setHideSideMenu] = useState(false)
  const dispatch = useDispatch()

  const alias = initialData === 'loading' ? '' : initialData.userInfo.alias
  const profileImage = initialData === 'loading' ? '' : initialData.userInfo.profile_img
  const level = initialData === 'loading' ? 0 : initialData.userInfo.level

  return (
    <Fragment>
      <div class={hide ? 'menu-tab hide' : 'menu-tab show'}>
        <img onClick={() => setHideSideMenu(true)} src='https://myG.gg/platform_images/Dashboard/logo.svg' class='img-fluid logo-img' />
        <div class='toggle-menu-btn'>
          <img src='https://myG.gg/platform_images/Dashboard/toggle_menu_collapsed.svg' class='img-fluid' />
        </div>
        <div className={'notification-expanded'}>
          <Link to='/?at=notifications&submenu=1'>
            <div className='notification-container'>
              <img src='https://myG.gg/platform_images/Dashboard/ntfo_Friendship_Icon.svg' height='22' width='22' />
              <NotificationIcon type="approvals" />
            </div>
          </Link>
          <Link to='/?at=notifications&submenu=2'>
            <div className='notification-container'>
              <img src='https://myG.gg/platform_images/Dashboard/Bell_Icon.svg' height='22' width='22' />
              <NotificationIcon type="alerts" />
            </div>
          </Link>
          <Link to='/?at=notifications&submenu=3'>
            <div className='notification-container'>
              <img src='https://myG.gg/platform_images/Dashboard/Chat_Icon.svg' height='22' width='22' />
              <NotificationIcon type="chats" />
            </div>
          </Link>
        </div>
      </div>
      {hideSideMenu && (
        <Fragment>
          <div className='mobile-top-menu-dropdown'>
            <div className='mobile-side-menu'>
              <div className='mobile-side-menu-top'>
                <div className='back-btn'>
                  <img
                    src='https://myG.gg/platform_images/Dashboard/btn_Uncollapse_Menu.svg'
                    onClick={() => setHideSideMenu(false)}
                  />
                </div>
                <div className='user-name-icon'>
                  <Link to={`/profile/${alias}`} onClick={() => setHideSideMenu(false)}>
                    <div className='user-icon'>
                      <img
                        onError={(ev) => {
                          ev.target.src = 'https://myG.gg/default_user/new-user-profile-picture.png'
                        }}
                        src={profileImage}
                        className='img-fluid'
                        alt='user-picture'
                      />
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
                    Home
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
                  <Link to='/?at=mygames' onClick={() => setHideSideMenu(false)}>
                    My Games
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
                  window.router.push('/logout');
                }}>
                <img src='https://myG.gg/platform_images/Dashboard/Logout_Icon.svg' />
                <span>Logout</span>
              </div>
              <div className='setting-btn'>
                <Link to='/mySettings' onClick={() => setHideSideMenu(false)}>
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
