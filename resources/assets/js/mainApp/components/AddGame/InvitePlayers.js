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
import { Convert_to_comma_delimited_value } from '../Utility_Function'

const MENU_OPTIONS = {
  PLAYERS: 'PLAYERS',
  GROUPS: 'GROUPS',
  COMMUNITIES: 'COMMUNITIES',
}

const InvitePlayers = ({ onInvitationSent, onCancelInviteClick, gameId }) => {
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
  // Communities
  const [communitiesKeywordSearchResults, updateCommunitiesKeywordSearchResults] = useState({
    searchResults: {},
    communitiesList: [],
    totalCommunities: 0,
  })
  const [selectedCommunities, updateSelectedCommunities] = useState({})

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
    console.log('selectedPlayers: ', selectedPlayers)
    Object.keys(selectedPlayers).forEach((playerKey, index) => {
      if (index === 0) {
        gamers = gamers.concat(`${selectedPlayers[playerKey].name}`)
        return
      }
      gamers = gamers.concat(`, ${selectedPlayers[playerKey].name}`)
      console.log('index x')
      console.log('gamers: ', gamers)
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

    console.log('communities: ', communities)
    console.log('gamers: ', gamers)
    console.log('groups: ', groups)

    try {
      await axios.post('/api/notifications/invitations', {
        communities,
        gamers,
        groups,
        schedule_games_id: gameId,
      })
    } catch (error) {
      console.log(error)
    }

    onInvitationSent()
  }

  const getFooter = () => {
    return (
      <div className='invite-players__footer-container'>
        <MyGButton customStyles={{ color: '#000', backgroundColor: '#E5C746' }} text='Invite' onClick={submitInvitation} />
        <MyGButton customStyles={{ color: '#E5C746', border: '2px solid' }} text='Cancel' onClick={onCancelInviteClick} />
      </div>
    )
  }

  const getGroupsMenu = () => {
    return (
      <div className='invite-players__menu-container'>
        <div className={styles.menuContainer}>
          <div onClick={() => updateSelectedMenu(MENU_OPTIONS.PLAYERS)}>
            <div className={classNames([styles.menuText, selectedMenu === MENU_OPTIONS.PLAYERS ? styles.menuTextSelected : null])}>
              Gamers
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
        {getSelectArea()}
      </div>
    )
  }

  const fetchMoreData = async () => {
    await updateCounter(counter + 10)
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
        console.log(error)
      }
    }
    await getKeywordSearchResults()
  }

  const fetchCommunitiesData = async () => {
    const getmyGroups = async function () {
      try {
        const {
          data: { myGroups },
        } = await axios.get('/api/groups/view')
        return myGroups
      } catch (error) {
        console.log(error)
        return null
      }
    }

    const getGroups_im_in = async function () {
      try {
        const {
          data: { groups_im_in },
        } = await axios.get('/api/usergroup/view')
        return groups_im_in
      } catch (error) {
        console.log(error)
        return null
      }
    }
    const myGroups = await getmyGroups()
    const groupsImIn = await getGroups_im_in()
    const { itemsArray: myGroupsItemsArray, dataObj: myGroupsItemObj } = normalizeCommunitiesData(myGroups)
    const { itemsArray: groupsImInItemsArray, dataObj: groupsImInItemObj } = normalizeCommunitiesData(groupsImIn)
    updateCommunitiesKeywordSearchResults({
      searchResults: { ...myGroupsItemObj, ...groupsImInItemObj },
      communitiesList: [myGroupsItemsArray, ...groupsImInItemsArray],
      totalCommunities: myGroups.length + groupsImIn.length,
    })
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
      console.log('error getting groups data: ', error)
    }
  }

  const onPlayerClick = (playerId, value) => {
    console.log('value: ', value)
    if (selectedPlayers[playerId]) {
      updateSelectedPlayers((currentData) => {
        let dataClone = Object.assign({}, currentData)
        delete dataClone[playerId]
        return {
          ...dataClone,
        }
      })
    } else {
      console.log('updateSelected: ', playerId)
      updateSelectedPlayers((currentData) => ({
        ...currentData,
        [playerId]: keywordSearchResults.searchResults[playerId],
      }))
    }
  }

  const onCommunityClick = (communityId) => {
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
        [communityId]: communitiesKeywordSearchResults.searchResults[communityId],
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
      <div>
        <InfiniteScroll dataLength={keywordSearchResults.friendsList.length} next={fetchMoreData} hasMore={moreplease} height={402}>
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
      } = await axios.post(`/api/user/playerSearchResults`, {
        alias: value,
      })
      const parsedData = parsePlayersToSelectData(playerSearchResults)
      return parsedData
    } catch (error) {
      console.log(error)
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
      console.log(error)
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
      console.log(error)
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
          onCommunityClick(value.id)
        }}
        placeholder='Search'
        value={null}
      />
    )
  }

  const getGroupsList = () => {
    return (
      <div>
        <InfiniteScroll dataLength={groupsKeywordSearchResults.groupsList.length} next={fetchGroupsData} hasMore={false} height={402}>
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
      <div>
        <InfiniteScroll dataLength={communitiesKeywordSearchResults.communitiesList.length} next={fetchCommunitiesData} height={402}>
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
        <div>{getGroupsMenu()}</div>
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

export default InvitePlayers
