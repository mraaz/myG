import React, { Fragment, useState } from 'react'

const MobileMenu = () => {
  const [hideSubMenu, setHideSubMenu] = useState(false)
  const [hideSideMenu, setHideSideMenu] = useState(false)
  return (
    <Fragment>
      <section className='main-mobile-menu'>
        {hideSideMenu && (
          <Fragment>
            <div className='mobile-side-menu'>
              <div className='mobile-side-menu-top'>
                <div className='back-btn'>
                  <img
                    src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Uncollapse_Menu.svg'
                    className='img-fluid'
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
                <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/Logout_Icon.svg' class='img-fluid' />
                <span>Logout</span>
              </div>
              <div className='setting-btn'>
                <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/Settings_Chat_Window.svg' class='img-fluid' />
              </div>
            </div>
          </Fragment>
        )}
        <div class='menu-tab' onClick={() => setHideSideMenu(!hideSideMenu)}>
          <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/logo.svg' class='img-fluid logo-img' />
          <div class='toggle-menu-btn'>
            <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/toggle_menu_collapsed.svg' class='img-fluid' />
          </div>
        </div>

        <div className='menu-bottom'>
          <div className='mobile-sub-menu'>
            <div className='mobile-feed-img'>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Feed.svg' class='img-fluid' />
            </div>
          </div>
          {/* Hide and Show Search */}
          <div className='mobile-search'>
            {hideSearch && (
              <div className='mobile-sub-menu-items'>
                <div className='find-matches'>
                  <a href='#'>
                    Find <b>Matches</b>
                  </a>
                </div>
                <div className='find-gamers'>
                  <a href='#'>
                    Find <b>Gamers</b>
                  </a>
                </div>
              </div>
            )}
            <div className='mobile-search-img' onClick={() => setHideSearch(!hideSearch)}>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Search.svg' class='img-fluid' />
            </div>
          </div>
          <div className='mobile-sub-menu'>
            {/* Hide and Show Create */}

            <div className='mobile-search'>
              {hideCreate && (
                <div className='mobile-sub-menu-items'>
                  <div className='find-matches'>
                    <a href='#'>
                      New <b>Matches</b>
                    </a>
                  </div>
                  <div className='find-gamers'>
                    <a href='#'>
                      New <b>Community</b>
                    </a>
                  </div>
                </div>
              )}
              <div className='mobile-search-img' onClick={() => setHideCreate(!hideCreate)}>
                <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_New_Game.svg' class='img-fluid' />
              </div>
            </div>
            <div className='mobile-create-img'></div>
          </div>
          <div className='mobile-sub-menu'>
            <div className='mobile-profile-img'>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Profile.svg' class='img-fluid' />
            </div>
          </div>
          <div className='mobile-sub-menu'>
            <div className='mobile-notification-img'>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/Bell_Icon.svg' class='img-fluid' />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default MobileMenu
