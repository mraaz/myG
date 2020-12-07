import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MobileMenuTop from './MobileMenuTop'
import { useScrollDirection } from '../../hooks';

const MobileMenu = ({ initialData }) => {
  const [hideSearch, setHideSearch] = useState(false)
  const [hideCreate, setHideCreate] = useState(false)
  const [hideNav, setHideNav] = useState(false)
  const [notifications, setNotifications] = useState({ alerts: 0, approvals: 0, chats: 0 })

  const direction = useScrollDirection();
  const alias = initialData === 'loading' ? '' : initialData.userInfo.alias

  useEffect(() => {
    if (direction === 'down') {
      setHideNav(true)
    } else {
      setHideNav(false)
    }
  })

  return (
    <Fragment>
      <MobileMenuTop initialData={ initialData } notifications={ {...notifications} } hide={hideNav}/>
      <section className='main-mobile-menu'>
        <div className={hideNav ? 'menu-bottom hide' : 'menu-bottom show'}>
          <div className='mobile-sub-menu'>
            <div className='mobile-feed-img'>
              <Link to='/'>
                <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Feed.svg' class='img-fluid' />
              </Link>
            </div>
          </div>
          {/* Hide and Show Search */}
          <div className='mobile-search'>
            {hideSearch && (
              <div className='mobile-sub-menu-items'>
                <div className='find-matches'>
                  <Link to='/scheduledGames'>
                    Find <b>Matches</b>
                  </Link>
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
                    <a href='#' onClick={() => setHideCreate(!hideCreate)}>
                      New <b>Matches</b>
                    </a>
                  </div>
                  <div className='find-gamers'>
                    <a href='#' onClick={() => setHideCreate(!hideCreate)}>
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
              <Link to={`/profile/${alias}`}>
                <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Profile.svg' class='img-fluid' />
              </Link>
            </div>
          </div>
          <div className='mobile-sub-menu'>
            <div className='mobile-notification-img'>
              <Link to='?at=notifications&submenu=0'>
                <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/Bell_Icon.svg' class='img-fluid' />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default MobileMenu
