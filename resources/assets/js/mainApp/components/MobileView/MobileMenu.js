import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSwipeable } from 'react-swipeable'

import MobileMenuTop from './MobileMenuTop'
import { openMobileMenuAction, closeMobileMenuAction, topOfScreenMobileMenuAction } from '../../../redux/actions/mobileMenuAction'
import { useScrollDirection } from '../../hooks'
import { logToElasticsearch } from '../../../integration/http/logger'
import { CreateCommunity, AddScheduleGames } from '../../AsyncComponent'
import Modal from '../common/Modal'
import ComposeSection from '../ComposeSection_v2'

import useModal from '../../hooks/useModal'

import axios from 'axios'

/**
 * The mobile menu is controlled by the redux store state. Specifically swiping and scrolling under certain
 * circumstance constrolls when and how to show the mobile menu.
 */
const MobileMenu = ({ initialData }) => {
  const [hideSearch, setHideSearch] = useState(false)
  const [hideCreate, setHideCreate] = useState(false)
  const [notifications, setNotifications] = useState({ alerts: 0, approvals: 0, chats: 0 })

  const dispatch = useDispatch()
  const mobileMenuIsActive = useSelector((state) => state.mobileMenu.mobileMenuIsActive)
  const mobileMenuIsTop = useSelector((state) => state.mobileMenu.mobileMenuIsTop)
  const direction = useScrollDirection()

  const alias = initialData === 'loading' ? '' : initialData.userInfo.alias

  const { ref } = useSwipeable({
    onSwipedUp: () => {
      if (mobileMenuIsActive) {
        dispatch(closeMobileMenuAction())
      }
    },
    onSwipedDown: () => {
      if (!mobileMenuIsActive) {
        dispatch(openMobileMenuAction())
      }
    },
  })

  // This effect is used to control the mobile menus based on scroll events.
  // It relies on redux actions and events open / close events can be triggered from parent and sibling components, not just children.
  useEffect(() => {
    if (direction === 'top') {
      // If the direction is top when this effect is triggered, its previous state must have been false, so trigger it.
      // We always want to open the menu if this is the case
      dispatch(openMobileMenuAction())
      dispatch(topOfScreenMobileMenuAction(true))
      return
    }

    if (mobileMenuIsTop) {
      // If the mobile menus top state is already true, we know it must now be false.
      // If false, don't waste a Action.
      // Do NOT early return yet as direction is important for flow of menu now.
      dispatch(topOfScreenMobileMenuAction(false))
    }

    if (direction === 'up' && !mobileMenuIsActive) {
      // If scrolling up, open the menu, if not already open.
      dispatch(openMobileMenuAction())
      return
    }

    if (direction === 'down' && mobileMenuIsActive) {
      // If scrolling down, close the menu(s), if not already closed.
      dispatch(closeMobileMenuAction())
      setHideSearch(false)
      setHideCreate(false)
      return
    }
  }, [direction])

  // Second useEffect is called only once, required so the API is only called once
  useEffect(() => {
    ref(window)
    const getNotis = async function() {
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

  const isInChannel = window.location.pathname.includes('myg-chat');
  return (
    <Fragment>
      <MobileMenuTop initialData={initialData} notifications={{ ...notifications }} />
      <section className='main-mobile-menu'>
        <div className={(mobileMenuIsActive || isInChannel) ? 'menu-bottom show' : 'menu-bottom hide'}>
          <div className='mobile-sub-menu'>
            <div className='mobile-feed-img'>
              <Link to='/'>
                <img src='https://myG.gg/platform_images/Dashboard/btn_Feed.svg' className='img-fluid' />
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
                      dispatch(closeMobileMenuAction())
                    }}>
                    Looking for <b>Games (LFG)</b>
                  </Link>
                </div>
                <div className='small-tile'>
                  <a
                    href='/find-gamers/search'
                    onClick={() => {
                      setHideSearch(false)
                      dispatch(closeMobileMenuAction())
                    }}>
                    Find <b>Gamers</b>
                  </a>
                </div>
              </div>
            )}
            <div className='mobile-search-img' onClick={() => setHideSearch(!hideSearch)}>
              <img src='https://myG.gg/platform_images/Dashboard/btn_Search.svg' className='img-fluid' />
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
                        dispatch(closeMobileMenuAction())
                      }}>
                      <b>Post</b> on your Feed
                    </Link>
                  </div>
                  <div className='small-tile'>
                    <Link
                      to='/addScheduleGames'
                      onClick={() => {
                        setHideSearch(false)
                        dispatch(closeMobileMenuAction())
                      }}>
                      New <b>Matches</b>
                    </Link>
                  </div>
                  <div className='small-tile'>
                    <Link
                      to='/community/create'
                      onClick={() => {
                        setHideSearch(false)
                        dispatch(closeMobileMenuAction())
                      }}>
                      New <b>Community</b>
                    </Link>
                  </div>
                </div>
              )}
              <div className='mobile-search-img' onClick={() => setHideCreate(!hideCreate)}>
                <img src='https://myG.gg/platform_images/Dashboard/btn_New_Game.svg' className='img-fluid' />
              </div>
            </div>
            <div className='mobile-create-img'></div>
          </div>
          <div className='mobile-sub-menu'>
            <div className='mobile-profile-img'>
              <Link to={`/profile/${alias}`}>
                <img src='https://myG.gg/platform_images/Dashboard/btn_Profile.svg' className='img-fluid' />
              </Link>
            </div>
          </div>
          <div className='mobile-sub-menu'>
            <div className='mobile-notification-img'>
              <Link to='?at=notifications&submenu=0'>
                <img src='https://myG.gg/platform_images/Dashboard/Bell_Icon.svg' className='img-fluid' />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default MobileMenu
