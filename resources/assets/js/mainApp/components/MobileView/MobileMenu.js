import React, { Fragment, useState } from 'react'

const MobileMenu = () => {
  const [hideSubMenu, setHideSubMenu] = useState(false)
  return (
    <Fragment>
      <section className='main-mobile-menu'>
        <div className='menu-bottom'>
          <div className='mobile-sub-menu'>
            <div className='mobile-feed-img'>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Feed.svg' class='img-fluid' />
            </div>
          </div>
          <div className='mobile-search'>
            {hideSubMenu && (
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
            <div className='mobile-search-img' onClick={() => setHideSubMenu(!hideSubMenu)}>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Search.svg' class='img-fluid' />
            </div>
          </div>
          <div className='mobile-sub-menu'>
            <div className='mobile-create-img'>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_New_Game.svg' class='img-fluid' />
            </div>
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
