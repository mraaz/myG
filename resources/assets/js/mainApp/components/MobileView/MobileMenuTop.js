import React, { Fragment, useState } from 'react'

const MobileMenuTop = () => {
  const [hideSideMenu, setHideSideMenu] = useState(false)

  return (
    <Fragment>
      <div class='menu-tab' onClick={() => setHideSideMenu(true)}>
        <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/logo.svg' class='img-fluid logo-img' />
        <div class='toggle-menu-btn'>
          <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/toggle_menu_collapsed.svg' class='img-fluid' />
        </div>
      </div>
      {hideSideMenu && (
        <Fragment>
          <div className='mobile-top-menu-dropdown'>
            <div className='mobile-side-menu'>
              <div className='mobile-side-menu-top'>
                <div className='back-btn'>
                  <img
                    src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Uncollapse_Menu.svg'
                    onClick={() => setHideSideMenu(false)}
                  />
                </div>
                <div className='user-name-icon'>
                  <div className='user-icon'></div>
                  <div className='user-name'>
                    <span>@brunogoodma</span>
                  </div>
                </div>
                <div className='level-information'>
                  <div className='level-wrapper'>
                    <span className='level'>level</span>
                    <br />
                    <span className='level-numer'>99</span>
                  </div>
                </div>
                <div className='reputation-reviews'>
                  <p className='reputation'>Reputation</p>
                  <p className='reputation-number'>4.66/5</p>
                  <p className='reputation-reviews-number'>556 reviews</p>
                </div>
              </div>
            </div>
            <div className='menu-list'>
              <ul>
                <li>Home</li>
                <li>Communities</li>
                <li>Notifications</li>
                <li>My Games</li>
              </ul>
            </div>
            <div className='logout-setting-section'>
              <div className='logout-btn'>
                <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/Logout_Icon.svg' />
                <span>Logout</span>
              </div>
              <div className='setting-btn'>
                <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/Settings_Chat_Window.svg' />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default MobileMenuTop
