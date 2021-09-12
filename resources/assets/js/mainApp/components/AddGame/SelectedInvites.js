import React, { useState } from 'react'
import classNames from 'classnames'
import { detectMob } from '../../utils/utils'

const SelectedInvites = ({
  selectedPlayers,
  selectedGroups,
  selectedCommunities,
  updateShowOptions,
  showOptions,
  onCommunityClick,
  onGroupClick,
  onPlayerClick
}) => {
  const [hoveredElements, updateHoveredElements] = useState({})
  const GROUP_LIST = ['Selected Players', 'Selected Groups', 'Selected Communities']
  const groupData = {
    'Selected Players': selectedPlayers,
    'Selected Groups': selectedGroups,
    'Selected Communities': selectedCommunities
  }
  const groupUpdate = {
    'Selected Players': onPlayerClick,
    'Selected Groups': onGroupClick,
    'Selected Communities': onCommunityClick
  }

  const handleMouseHover = (key) => {
    updateHoveredElements((currentElements) => ({
      ...currentElements,
      [key]: true
    }))
  }

  const onMouseLeave = (key) => {
    updateHoveredElements((currentElements) => ({
      ...currentElements,
      [key]: false
    }))
  }

  const getHeaderView = (group) => {
    return (
      <div
        className='invite-players__invites-header-container'
        onClick={() => {
          updateShowOptions((currentOptions) => ({
            ...currentOptions,
            [group]: !currentOptions[group]
          }))
        }}
      >
        <div className='invite-players__invites-header'>{group}</div>
        <div className='invite-players__invites-header-right'>
          <div className='invite-players__invites-header-right-count'>({Object.keys(groupData[group]).length})</div>
          <div
            className={classNames([
              'invite-players__invites-header-arrow',
              showOptions[group] ? 'invite-players__invites-header-arrow-down' : ''
            ])}
          ></div>
        </div>
      </div>
    )
  }

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/default_user/new-user-profile-picture.png'
  }

  const getInvitesListView = (group) => {
    const data = groupData[group]
    const onClickHandler = groupUpdate[group]

    return (
      <div
        className={classNames(['invite-players__player-list-container', showOptions[group] ? '' : 'invite-players__player-list-hidden'])}
      >
        {Object.keys(data).map((key) => {
          return (
            <div
              key={key}
              onMouseEnter={() => {
                handleMouseHover(key)
              }}
              onMouseLeave={() => {
                onMouseLeave(key)
              }}
              className={classNames([
                'invite-players__player-list-element',
                hoveredElements[key] ? '' : 'invite-players__player-list-element-hovered'
              ])}
            >
              <div style={{ display: 'flex' }}>
                <img onError={addDefaultSrc} src={data[key].img} height={20} width={20} className='invite-players__player-image' />
                <div className='invite-players__player-list-text'>{data[key].name}</div>
              </div>
              <img
                className={
                  hoveredElements[key]
                    ? 'invite-players__player-list-element-delete-hoverred'
                    : 'invite-players__player-list-element-delete'
                }
                src='https://myG.gg/platform_images/Dashboard/X+icon.svg'
                height={20}
                width={20}
                onClick={() => onClickHandler(key)}
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className='invite-players__invites-area-container'>
      {!detectMob() &&
        GROUP_LIST.map((group) => {
          return (
            <div className='invite-players__invites-area-tile-container' key={group}>
              {getHeaderView(group)}
              {getInvitesListView(group)}
            </div>
          )
        })}
    </div>
  )
}

export default SelectedInvites
