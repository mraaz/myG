import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import { useDispatch, useSelector } from 'react-redux'
import MobileMenuTop from './MobileMenuTop'

import { mobileMenuAction } from '../../../redux/actions/mobileMenuAction'
import { useScrollDirection } from '../../hooks'
import { logToElasticsearch } from '../../../integration/http/logger'
import { CreateCommunity, AddScheduleGames } from '../../AsyncComponent'
import Modal from '../common/Modal'
import ComposeSection from '../ComposeSection_v2'

import useModal from '../../hooks/useModal'

import axios from 'axios'

const MobileMenu = ({ initialData }) => {
  const [hideSearch, setHideSearch] = useState(false)
  const [hideCreate, setHideCreate] = useState(false)
  const [hideNav, setHideNav] = useState(true)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [notifications, setNotifications] = useState({ alerts: 0, approvals: 0, chats: 0 })

  const dispatch = useDispatch()
  const showMobileMenu = useSelector(state => state.mobileMenu.showMobileMenu)
  const direction = useScrollDirection()
  const { ref } = useSwipeable({
    onSwipedUp: () => setSwipeDirection('up'),
    onSwipedDown: () => setSwipeDirection('down'),
  })
  const alias = initialData === 'loading' ? '' : initialData.userInfo.alias

  // First useEffect is called every time direction changes, required to hide menus on scroll
  useEffect(() => {
    if (direction === 'down' || swipeDirection === 'down') {
      dispatch(mobileMenuAction(true))
      setHideNav(true)
      setHideSearch(false)
      setHideCreate(false)
    } else {
      if (showMobileMenu) {
        setHideNav(false)
      }
    }
  }, [direction, showMobileMenu])

  // Second useEffect is called only once, required so the API is only called once
  useEffect(() => {
    ref(window)
    const getNotis = async function () {
      let _chats = 0
      try {
        const getnoti = await axios.post('/api/notifications_v2/getUnread_count', {
          notification_type: -1,
        })

        const chat_noti = await axios.get('/api/chat/message/unread?count=true')

        if (chat_noti.data) {
          const { unreadMessages = 0 } = chat_noti.data
          _chats = unreadMessages
        }

        if (getnoti.data) {
          const { getUnread_count_Alerts = 0, getUnread_count_Approvals = 0 } = getnoti.data

          setNotifications({
            alerts: getUnread_count_Alerts,
            approvals: getUnread_count_Approvals,
            chats: _chats,
          })
        } else {
          setNotifications({
            alerts: 0,
            approvals: 0,
            chats: _chats,
          })
        }
      } catch (error) {
        logToElasticsearch('error', 'MobileMenu', 'Failed getNotis:' + ' ' + error)
      }
    }

    getNotis()
  }, [])

  return (
    <Fragment>
      <MobileMenuTop initialData={initialData} notifications={{ ...notifications }} hide={hideNav} />
      <section className='main-mobile-menu'>
        <div className={hideNav ? 'menu-bottom hide' : 'menu-bottom show'}>
          <div className='mobile-sub-menu'>
            <div className='mobile-feed-img'>
              <Link to='/'>
                <img src='https://cdn.myG.gg/platform_images/Dashboard/btn_Feed.svg' class='img-fluid' />
              </Link>
            </div>
          </div>
          {/* Hide and Show Search */}
          <div className='mobile-search'>
            {hideSearch && (
              <div className='mobile-sub-menu-items single-row'>
                <div className='small-tile'>
                  <Link
                    to='/scheduledGames'
                    onClick={() => {
                      setHideSearch(false)
                      setHideNav(true)
                      dispatch(mobileMenuAction(false))
                    }}>
                    Find <b>Matches</b>
                  </Link>
                </div>
                <div className='small-tile'>
                  <a
                    href='/find-gamers/search'
                    onClick={() => {
                      setHideSearch(false)
                      setHideNav(true)
                    }}>
                    Find <b>Gamers</b>
                  </a>
                </div>
              </div>
            )}
            <div className='mobile-search-img' onClick={() => setHideSearch(!hideSearch)}>
              <img src='https://cdn.myG.gg/platform_images/Dashboard/btn_Search.svg' class='img-fluid' />
            </div>
          </div>
          <div className='mobile-sub-menu'>
            {/* Hide and Show Create */}

            <div className='mobile-search'>
              {hideCreate && (
                <div className='mobile-sub-menu-items'>
                  <div className='large-tile'>
                    <Link
                      to='/'
                      onClick={() => {
                        setHideSearch(false)
                        setHideNav(true)
                      }}>
                      <b>Post</b> on your Feed
                    </Link>
                  </div>
                  <div className='small-tile'>
                    <Link
                      to='/addScheduleGames'
                      onClick={() => {
                        setHideSearch(false)
                        setHideNav(true)
                      }}>
                      New <b>Matches</b>
                    </Link>
                  </div>
                  <div className='small-tile'>
                    <Link
                      to='/community/create'
                      onClick={() => {
                        setHideSearch(false)
                        setHideNav(true)
                      }}>
                      New <b>Community</b>
                    </Link>
                  </div>
                </div>
              )}
              <div className='mobile-search-img' onClick={() => setHideCreate(!hideCreate)}>
                <img src='https://cdn.myG.gg/platform_images/Dashboard/btn_New_Game.svg' class='img-fluid' />
              </div>
            </div>
            <div className='mobile-create-img'></div>
          </div>
          <div className='mobile-sub-menu'>
            <div className='mobile-profile-img'>
              <Link to={`/profile/${alias}`}>
                <img src='https://cdn.myG.gg/platform_images/Dashboard/btn_Profile.svg' class='img-fluid' />
              </Link>
            </div>
          </div>
          <div className='mobile-sub-menu'>
            <div className='mobile-notification-img'>
              <Link to='?at=notifications&submenu=0'>
                <img src='https://cdn.myG.gg/platform_images/Dashboard/Bell_Icon.svg' class='img-fluid' />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default MobileMenu
