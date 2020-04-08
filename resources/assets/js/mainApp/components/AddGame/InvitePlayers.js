import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'

import { MyGModal, MyGButton, MyGCheckbox } from '../common'
import { styles } from '../../static/AddGame'
import '../../styles/AddGame/InvitePlayersStyles.scss'
import '../../styles/AddGame/AddGameStyles.scss'

const MENU_OPTIONS = {
  PLAYERS: 'PLAYERS',
  GROUPS: 'GROUPS',
  COMMUNITIES: 'COMMUNITIES',
}

const DUMMY_DATA_RESULTS = [
  {
    alias: 'Christy66',
    profile_img: 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png',
    id: 352,
  },
  {
    alias: 'Christoper79',
    profile_img: 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png',
    id: 359,
  },
  {
    alias: 'Christie10',
    profile_img: 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png',
    id: 975,
  },
]

const InvitePlayers = ({ isOpen }) => {
  const [selectedMenu, updateSelectedMenu] = useState(MENU_OPTIONS.PLAYERS)
  const [moreplease, updateMorePlease] = useState(true)
  const [counter, updateCounter] = useState(1)
  const [showOptions, updateShowOptions] = useState({
    'Selected Players': true,
    'Selected Groups': true,
    'Selected Communities': true,
  })
  const [keywordSearchResults, updateKeywordSearchResults] = useState({
    searchResults: {},
    friendsList: [],
    totalFriends: 0,
  })
  const [groupSearchResults, updateGroupSearchResults] = useState({
    searchResults: {},
    groupList: [],
    totalGroups: 0,
  })

  useEffect(() => {
    fetchMoreData()
  }, [])

  const getHeader = () => {
    return (
      <div className='invite-players__header-container'>
        <div className='invite-players__header-text'>InvitePlayers</div>
      </div>
    )
  }

  const getFooter = () => {
    return (
      <div className='invite-players__footer-container'>
        <MyGButton customStyles={{ color: '#000', backgroundColor: '#E5C746' }} text='Invite' />
        <MyGButton customStyles={{ color: '#E5C746', border: '2px solid' }} text='Cancel' />
      </div>
    )
  }

  const getGroupsMenu = () => {
    return (
      <div className='invite-players__menu-container'>
        <div className={styles.menuContainer}>
          <div onClick={() => updateSelectedMenu(MENU_OPTIONS.PLAYERS)}>
            <div className={classNames([styles.menuText, selectedMenu === MENU_OPTIONS.PLAYERS ? styles.menuTextSelected : null])}>
              Players
            </div>
            <div className={classNames([styles.menuLine, selectedMenu === MENU_OPTIONS.PLAYERS ? styles.menuLineHighlighted : null])} />
          </div>
          <div onClick={() => updateSelectedMenu(MENU_OPTIONS.GROUPS)}>
            <div className={classNames([styles.menuText, selectedMenu === MENU_OPTIONS.PLAYERS ? styles.menuTextSelected : null])}>
              Groups
            </div>
            <div className={classNames([styles.menuLine, selectedMenu === MENU_OPTIONS.GROUPS ? styles.menuLineHighlighted : null])} />
          </div>
          <div onClick={() => updateSelectedMenu(MENU_OPTIONS.COMMUNITIES)}>
            <div className={classNames([styles.menuText, selectedMenu === MENU_OPTIONS.PLAYERS ? styles.menuTextSelected : null])}>
              Communities
            </div>
            <div className={classNames([styles.menuLine, selectedMenu === MENU_OPTIONS.COMMUNITIES ? styles.menuLineHighlighted : null])} />
          </div>
        </div>
      </div>
    )
  }

  const getIndividualSearchTab = (item, index, lastRow) => {
    return (
      <div key={index} className='invite-players__player-profile-container'>
        <div className='invite-players__player-profile'>
          <img src={item.profile_img} height={20} width={20} className='invite-players__player-image' />
          <div className='invite-players__player-alias'>{item.alias}</div>
        </div>
        <MyGCheckbox checked={item.checked} onClick={(value) => {}} containerStyles={{ marginBottom: 0 }} />
      </div>
    )
  }

  const showSearchResults = () => {
    if (keywordSearchResults.friendsList != undefined) {
      const rowLen = keywordSearchResults.friendsList.length
      var lastRow = false
      if (rowLen == 0) {
        return null
      }
      return keywordSearchResults.friendsList.map((key, index) => {
        if (rowLen === index + 1) {
          lastRow = true
        }
        return getIndividualSearchTab(keywordSearchResults.searchResults[key], index, lastRow)
      })
    }
  }

  const normalizeData = (data) => {
    const itemsArray = []
    const dataObj = {}

    if (!data) {
      return {
        itemsArray,
        dataObj,
      }
    }
    data.map((item) => {
      itemsArray.push(item.friend_id)
      dataObj[item.friend_id] = item
    })
    return {
      itemsArray,
      dataObj,
    }
  }

  const fetchMoreData = async () => {
    console.log('fetchMoreData Called: ', counter)
    await updateCounter(counter + 28)
    const getKeywordSearchResults = async function() {
      console.log('counter: ', counter)
      try {
        const response = await axios.post('/api/friends/allmyFriends', {
          counter,
        })
        console.log('response: ', response)

        if (response.data.showallMyFriends.length == 0) {
          updateMorePlease(false)
          return
        }
        const { itemsArray, dataObj } = normalizeData(response.data.showallMyFriends)
        console.log('itemsArray: ', itemsArray)
        console.log('dataObj: ', dataObj)

        await updateKeywordSearchResults((currentResults) => ({
          searchResults: { ...currentResults.searchResults, ...dataObj },
          friendsList: [...currentResults.friendsList, ...itemsArray],
          totalFriends: response.data.myFriendsLength[0].total_friends,
        }))
      } catch (error) {
        console.log(error)
      }
    }
    await getKeywordSearchResults()
  }

  const getPlayersList = () => {
    console.log('keywordSearchResults.totalFriends: ', keywordSearchResults.totalFriends)
    return (
      <div>
        <InfiniteScroll dataLength={keywordSearchResults.friendsList.length} next={fetchMoreData} hasMore={moreplease} height={402}>
          {showSearchResults()}
        </InfiniteScroll>
      </div>
    )
  }

  const getResultsList = () => {
    switch (selectedMenu) {
      case MENU_OPTIONS.PLAYERS:
        return getPlayersList()
      case MENU_OPTIONS.GROUPS:
        return null
      case MENU_OPTIONS.COMMUNITIES:
        return null
    }
  }

  const getSearchArea = () => {
    return (
      <div className='invite-players__search-area-container'>
        <div>
          {getGroupsMenu()}
          <div></div>
        </div>
        {getResultsList()}
      </div>
    )
  }

  const getSelectedInvitesArea = () => {
    const GROUP_LIST = ['Selected Players', 'Selected Groups', 'Selected Communities']

    return (
      <div className='invite-players__invites-area-container'>
        {GROUP_LIST.map((group) => {
          return (
            <div>
              <div
                className='invite-players__invites-header-container'
                onClick={() => {
                  updateShowOptions((currentOptions) => ({
                    ...currentOptions,
                    [group]: !currentOptions[group],
                  }))
                }}>
                <div className='invite-players__invites-header'>{group}</div>
                <div className='invite-players__invites-header-right'>
                  <div className='invite-players__invites-header-right-count'>(6)</div>
                  <div
                    className={classNames([
                      'invite-players__invites-header-arrow',
                      showOptions[group] ? 'invite-players__invites-header-arrow-down' : '',
                    ])}>
                    >
                  </div>
                </div>
              </div>
              <div
                className={classNames([
                  'invite-players__player-list-container',
                  showOptions[group] ? '' : 'invite-players__player-list-hidden',
                ])}>
                {['Player1', 'Player1', 'Player1'].map((playerName) => {
                  return <div className='invite-players__player-list-text'>{playerName}</div>
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const getContent = () => {
    return (
      <div className='invite-players__content-container'>
        {getSearchArea()}
        {getSelectedInvitesArea()}
      </div>
    )
  }

  console.log('showfriends: ', keywordSearchResults)
  console.log('morePlease: ', moreplease)

  return (
    <MyGModal isOpen={isOpen}>
      <div className='invite-players__container'>
        {getHeader()}
        {getContent()}
        {getFooter()}
      </div>
    </MyGModal>
  )
}

export default InvitePlayers
