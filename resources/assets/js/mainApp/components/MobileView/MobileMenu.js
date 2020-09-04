import React, { Component, Fragment } from 'react'

class MobileMenu extends Component {
  render() {
    return (
      <Fragment>
        <section className='main-mobile-menu'>
          <div className='menu-bottom'>
            <div className='mobile-feed'>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Feed.svg' class='img-fluid' />
            </div>
            <div className='mobile-search'>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Search.svg' class='img-fluid' />
            </div>
            <div className='mobile-create'>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_New_Game.svg' class='img-fluid' />
            </div>
            <div className='mobile-profile'>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Profile.svg' class='img-fluid' />
            </div>
            <div className='mobile-notification'>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/Bell_Icon.svg' class='img-fluid' />
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}

export default MobileMenu
