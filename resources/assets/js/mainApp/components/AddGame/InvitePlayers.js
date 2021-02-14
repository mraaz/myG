import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'

import { MyGModal, MyGButton, MyGAsyncSelect } from '../common'
import { styles } from '../../static/AddGame'
import UserTab from './UserTab'
import {
  normalizePlayersData,
  normalizeCommunitiesData,
  normalizeGroupsData,
  parseCommunitiesToSelectData,
  parsePlayersToSelectData,
} from '../../utils/InvitePlayersUtils'
import '../../styles/AddGame/InvitePlayersStyles.scss'
import '../../styles/AddGame/AddGameStyles.scss'
import SelectedInvites from './SelectedInvites'
import { detectMob } from '../../utils/utils'

const MENU_OPTIONS = {
  PLAYERS: 'PLAYERS',
  GROUPS: 'GROUPS',
  COMMUNITIES: 'COMMUNITIES',
}

const InvitePlayers = ({ onInvitationSent, onCancelInviteClick, scheduledGameId, scheduledGameGuid, gameTitle, startTime, gameId }) => {
  const [selectedMenu, updateSelectedMenu] = useState(MENU_OPTIONS.PLAYERS)
  const [showOptions, updateShowOptions] = useState({
    'Selected Gamers': false,
    'Selected Groups': false,
    'Selected Communities': false,
  })
  // Friends
  const [keywordSearchResults, updateKeywordSearchResults] = useState({
    searchResults: {},
    friendsList: [],
    totalFriends: 0,
  })
  const [moreplease, updateMorePlease] = useState(true)
  const [counter, updateCounter] = useState(1)
  const [selectedPlayers, updateSelectedPlayers] = useState({})
  // Groups
  const [groupsKeywordSearchResults, updateGroupsKeywordSearchResults] = useState({
    searchResults: {},
    groupsList: [],
    totalGroups: 0,
  })
  const [selectedGroups, updateSelectedGroups] = useState({})
  const [groupsSuggestions, updateGroupsSuggestions] = useState([])
  const [morepleaseGroups, updateMorePleaseGropus] = useState(true)
  const [counterGroups, updateGroupsCounter] = useState(1)
  // Communities
  const [communitiesKeywordSearchResults, updateCommunitiesKeywordSearchResults] = useState({
    searchResults: {},
    communitiesList: [],
    totalCommunities: 0,
  })
  const [selectedCommunities, updateSelectedCommunities] = useState({})
  const [morepleaseCommunities, updateMorePleaseCommunities] = useState(true)
  const [counterCommunities, updateCommunitiesCounter] = useState(1)

  useEffect(() => {
    fetchMoreData()
    fetchCommunitiesData()
    fetchGroupsData()
  }, [])

  const getHeader = () => {
    return (
      <div className='invite-players__header-container'>
        <div className='invite-players__header-text'>Invite Gamers</div>
      </div>
    )
  }

  const submitInvitation = async () => {
    // atleast one player invited
    if (false) {
      return
    }
    var gamers = '',
      groups = '',
      communities = ''
    Object.keys(selectedPlayers).forEach((playerKey, index) => {
      if (index === 0) {
        gamers = gamers.concat(`${selectedPlayers[playerKey].name}`)
        return
      }
      gamers = gamers.concat(`, ${selectedPlayers[playerKey].name}`)
    })
    Object.keys(selectedCommunities).forEach((communityKey, index) => {
      if (index === 0) {
        communities = communities.concat(`${selectedCommunities[communityKey].name}`)
        return
      }
      communities = communities.concat(`, ${selectedCommunities[communityKey].name}`)
    })
    Object.keys(selectedGroups).forEach((groupKey, index) => {
      if (index === 0) {
        groups = groups.concat(`${selectedGroups[groupKey].name}`)
        return
      }
      groups = groups.concat(`, ${selectedGroups[groupKey].name}`)
    })
    try {
      await axios.post('/api/notifications_v2/invitations', {
        communities,
        gamers,
        groups,
        schedule_games_id: gameId,
        scheduledGameId,
        scheduledGameGuid,
        gameTitle,
        startTime,
      })
    } catch (error) {
      // error submit invitation
    }

    onInvitationSent()
  }

  const getFooter = () => {
    return (
      <div className='invite-players__footer-container'>
        <MyGButton customStyles={{ color: '#000', backgroundColor: '#E5C746' }} text='Invite' onClick={submitInvitation} />
        {!detectMob() && <MyGButton customStyles={{ color: '#E5C746', border: '2px solid' }} text='Cancel' onClick={onCancelInviteClick} />}
      </div>
    )
  }

  const getGroupsMenu = () => {
    return (
      <div className='invite-players__menu-container'>
        <div className={styles.menuContainer}>
          <div onClick={() => updateSelectedMenu(MENU_OPTIONS.PLAYERS)}>
            <div className={classNames([styles.menuText, selectedMenu === MENU_OPTIONS.PLAYERS ? styles.menuTextSelected : null])}>
              <span className='invite-gamers-tab'>Gamers</span>
            </div>
            <div className={classNames([styles.menuLine, selectedMenu === MENU_OPTIONS.PLAYERS ? styles.menuLineHighlighted : null])} />
          </div>
          <div onClick={() => updateSelectedMenu(MENU_OPTIONS.GROUPS)}>
            <div className={classNames([styles.menuText, selectedMenu === MENU_OPTIONS.PLAYERS ? styles.menuTextSelected : null])}>
              <span className='invite-gamers-tab'>Groups</span>
            </div>
            <div className={classNames([styles.menuLine, selectedMenu === MENU_OPTIONS.GROUPS ? styles.menuLineHighlighted : null])} />
          </div>
          <div onClick={() => updateSelectedMenu(MENU_OPTIONS.COMMUNITIES)}>
            <div className={classNames([styles.menuText, selectedMenu === MENU_OPTIONS.PLAYERS ? styles.menuTextSelected : null])}>
              <span className='invite-gamers-tab'>Communities</span>
            </div>
            <div className={classNames([styles.menuLine, selectedMenu === MENU_OPTIONS.COMMUNITIES ? styles.menuLineHighlighted : null])} />
          </div>
        </div>
        {getSelectArea()}
      </div>
    )
  }

  const fetchMoreData = async () => {
    await updateCounter(counter + 1)
    const getKeywordSearchResults = async function () {
      try {
        const response = await axios.post('/api/friends/allmyFriends', {
          counter,
        })
        if (response.data.showallMyFriends.length == 0) {
          updateMorePlease(false)
          return
        }
        const { itemsArray, dataObj } = normalizePlayersData(response.data.showallMyFriends.data)
        await updateKeywordSearchResults((currentResults) => ({
          searchResults: { ...currentResults.searchResults, ...dataObj },
          friendsList: [...currentResults.friendsList, ...itemsArray],
          totalFriends: response.data.myFriendsLength[0].total_friends,
        }))
      } catch (error) {
        // error fetch more data
      }
    }
    await getKeywordSearchResults()
  }

  const fetchCommunitiesData = async () => {
    await updateCommunitiesCounter(counterCommunities + 1)
    const getmyGroups = async function () {
      try {
        const {
          data: { myGroups },
        } = await axios.get(`/api/groups/view/${counterCommunities}`)
        return myGroups
      } catch (error) {
        // error fetch communities data
        return null
      }
    }

    const getGroups_im_in = async function () {
      try {
        const {
          data: { groups_im_in },
        } = await axios.get(`/api/usergroup/view/${counterCommunities}`)
        return groups_im_in
      } catch (error) {
        // error getGroups_im_in
        return null
      }
    }
    const myGroups = await getmyGroups()
    const groupsImIn = await getGroups_im_in()
    if (myGroups.length === 0 && groupsImIn.length === 0) {
      updateMorePleaseCommunities(false)
      return
    }

    const { itemsArray: myGroupsItemsArray, dataObj: myGroupsItemObj } = normalizeCommunitiesData(myGroups)
    const { itemsArray: groupsImInItemsArray, dataObj: groupsImInItemObj } = normalizeCommunitiesData(groupsImIn)
    updateCommunitiesKeywordSearchResults((currentResults) => ({
      searchResults: { ...currentResults.searchResults, ...myGroupsItemObj, ...groupsImInItemObj },
      communitiesList: [...currentResults.communitiesList, ...myGroupsItemsArray, ...groupsImInItemsArray],
      totalCommunities: (myGroups ? myGroups.length : 0) + (groupsImIn ? groupsImIn.length : 0),
    }))
  }

  const fetchGroupsData = async () => {
    try {
      const {
        data: { chats },
      } = await axios.get('/api/chat?onlyGroups=true')
      const { itemsArray, dataObj } = normalizeGroupsData(chats)
      updateGroupsKeywordSearchResults({
        searchResults: { ...dataObj },
        groupsList: [...itemsArray],
        totalGroups: chats.length,
      })
    } catch (error) {
      // error getting groups data
    }
  }

  const onPlayerClick = (playerId, value) => {
    if (selectedPlayers[playerId]) {
      updateSelectedPlayers((currentData) => {
        let dataClone = Object.assign({}, currentData)
        delete dataClone[playerId]
        return {
          ...dataClone,
        }
      })
    } else {
      updateSelectedPlayers((currentData) => ({
        ...currentData,
        [playerId]: value
          ? {
              id: value.id,
              img: value.img,
              name: value.name,
            }
          : keywordSearchResults.searchResults[playerId],
      }))
    }
  }

  const onCommunityClick = (communityId, value) => {
    if (selectedCommunities[communityId]) {
      updateSelectedCommunities((currentData) => {
        let dataClone = Object.assign({}, currentData)
        delete dataClone[communityId]
        return {
          ...dataClone,
        }
      })
    } else {
      updateSelectedCommunities((currentData) => ({
        ...currentData,
        [communityId]: value
          ? {
              id: value.id,
              name: value.name,
              img: value.img,
            }
          : communitiesKeywordSearchResults.searchResults[communityId],
      }))
    }
  }

  const onGroupClick = (groupId) => {
    if (selectedGroups[groupId]) {
      updateSelectedGroups((currentData) => {
        let dataClone = Object.assign({}, currentData)
        delete dataClone[groupId]
        return {
          ...dataClone,
        }
      })
    } else {
      updateSelectedGroups((currentData) => ({
        ...currentData,
        [groupId]: groupsKeywordSearchResults.searchResults[groupId],
      }))
    }
  }

  const getPlayersList = () => {
    return (
      <div className='invite-players__player-list'>
        <InfiniteScroll
          dataLength={keywordSearchResults.friendsList.length}
          next={fetchMoreData}
          hasMore={moreplease}
          height={402}
          style={{ scrollbarWidth: 'none' }}>
          <UserTab
            dataList={keywordSearchResults.friendsList}
            dataObject={keywordSearchResults.searchResults}
            selectedItemsObject={selectedPlayers}
            onClick={onPlayerClick}
          />
        </InfiniteScroll>
      </div>
    )
  }

  // ToDo:
  const onPlayersSuggestionFetch = async (value) => {
    try {
      const {
        data: { playerSearchResults },
      } = await axios.post(`/api/user/keywordSearchResults`, {
        keywords: value,
        counter: 1,
      })
      const parsedData = parsePlayersToSelectData(playerSearchResults.data)
      return parsedData
    } catch (error) {
      // error onPlayersSuggestionFetch
    }
  }

  const onCommunitiesSuggestionFetch = async (value) => {
    try {
      const {
        data: { groupSearchResults },
      } = await axios.get(`/api/groups/${value}/groupSearchResults`)
      const parsedData = parseCommunitiesToSelectData(groupSearchResults)
      return parsedData
    } catch (error) {
      // error onCommunitiesSuggestionFetch
    }
  }

  const onGroupsSuggestionFetch = async (value) => {
    try {
      const {
        data: { groupSearchResults },
      } = await axios.get(`/api/groups?groupName=${value}`)
      const parsedData = parseGroupsToSelectData(groupSearchResults)
      return parsedData
    } catch (error) {
      // error onGroupsSuggestionFetch
    }
  }

  const getPlayersSearch = () => {
    return (
      <MyGAsyncSelect
        styles={{
          container: {
            marginTop: '20px',
          },
          control: {
            width: '439px',
          },
          menuList: {
            backgroundColor: '#1d2326',
          },
        }}
        isValidNewOption={() => {
          return
        }}
        loadOptions={onPlayersSuggestionFetch}
        onChange={(value) => {
          onPlayerClick(value.id, value)
        }}
        placeholder='Search'
        value={null}
      />
    )
  }

  const getGroupsSearch = () => {
    return (
      <MyGAsyncSelect
        styles={{
          container: {
            marginTop: '20px',
          },
          control: {
            width: '439px',
          },
        }}
        isValidNewOption={() => {
          return
        }}
        loadOptions={onGroupsSuggestionFetch}
        onChange={(value) => {
          onGroupClick(value.id)
        }}
        placeholder='Search'
        options={groupsSuggestions}
        value={null}
      />
    )
  }

  const getCommunitiesSearch = () => {
    return (
      <MyGAsyncSelect
        styles={{
          container: {
            marginTop: '20px',
          },
          control: {
            width: '439px',
          },
        }}
        isValidNewOption={() => {
          return
        }}
        loadOptions={onCommunitiesSuggestionFetch}
        onChange={(value) => {
          onCommunityClick(value.id, value)
        }}
        placeholder='Search'
        value={null}
      />
    )
  }

  const getGroupsList = () => {
    return (
      <div className='invite-players__player-list'>
        <InfiniteScroll
          dataLength={groupsKeywordSearchResults.groupsList.length}
          next={fetchGroupsData}
          hasMore={false}
          height={402}
          style={{ scrollbarWidth: 'none' }}>
          <UserTab
            dataList={groupsKeywordSearchResults.groupsList}
            dataObject={groupsKeywordSearchResults.searchResults}
            selectedItemsObject={selectedGroups}
            onClick={onGroupClick}
          />
        </InfiniteScroll>
      </div>
    )
  }

  const getCommunitiesList = () => {
    return (
      <div className='invite-players__player-list'>
        <InfiniteScroll
          dataLength={communitiesKeywordSearchResults.communitiesList.length}
          next={fetchCommunitiesData}
          height={402}
          hasMore={morepleaseCommunities}
          style={{ scrollbarWidth: 'none' }}>
          <UserTab
            dataList={communitiesKeywordSearchResults.communitiesList}
            dataObject={communitiesKeywordSearchResults.searchResults}
            selectedItemsObject={selectedCommunities}
            onClick={onCommunityClick}
          />
        </InfiniteScroll>
      </div>
    )
  }

  const getResultsList = () => {
    switch (selectedMenu) {
      case MENU_OPTIONS.PLAYERS:
        return getPlayersList()
      case MENU_OPTIONS.GROUPS:
        return getGroupsList()
      case MENU_OPTIONS.COMMUNITIES:
        return getCommunitiesList()
    }
  }

  const getSelectArea = () => {
    switch (selectedMenu) {
      case MENU_OPTIONS.PLAYERS:
        return getPlayersSearch()
      case MENU_OPTIONS.GROUPS:
        return getGroupsSearch()
      case MENU_OPTIONS.COMMUNITIES:
        return getCommunitiesSearch()
    }
  }

  const getSearchArea = () => {
    return (
      <div className='invite-players__search-area-container'>
        {getGroupsMenu()}
        {getResultsList()}
      </div>
    )
  }

  const getContent = () => {
    return (
      <div className='invite-players__content-container'>
        {getSearchArea()}
        <SelectedInvites
          selectedPlayers={selectedPlayers}
          selectedGroups={selectedGroups}
          selectedCommunities={selectedCommunities}
          updateShowOptions={updateShowOptions}
          showOptions={showOptions}
          onCommunityClick={onCommunityClick}
          onGroupClick={onGroupClick}
          onPlayerClick={onPlayerClick}
        />
      </div>
    )
  }

  const getDesktopVersion = () => {
    return (
      <MyGModal isOpen ariaHideApp={false}>
        <div className='invite-players__container'>
          {getHeader()}
          {getContent()}
          {getFooter()}
        </div>
      </MyGModal>
    )
  }

  return (
    <div>
      {detectMob() == true && (
        <div>
          <div className='invite-players__container'>
            {getHeader()}
            {getContent()}
            {getFooter()}
            <div className='modal__close' onClick={onCancelInviteClick}>
              <img src='https://myG.gg/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>
          <div className='modal-overlay' onClick={onCancelInviteClick}></div>
        </div>
      )}
      {detectMob() == false && getDesktopVersion()}
    </div>
  )
}

export default InvitePlayers
