import React, { useState } from 'react'
import classNames from 'classnames'

// ToDo: add profile image
const SelectedInvites = ({ selectedPlayers, selectedGroups, selectedCommunities, updateShowOptions, showOptions }) => {
  const [hoveredElements, updateHoveredElements] = useState({})
  const GROUP_LIST = ['Selected Players', 'Selected Groups', 'Selected Communities']
  const groupData = {
    'Selected Players': selectedPlayers,
    'Selected Groups': selectedGroups,
    'Selected Communities': selectedCommunities,
  }

  const handleMouseHover = (key) => {
    console.log('key: ', key)
    updateHoveredElements((currentElements) => ({
      ...currentElements,
      [key]: true,
    }))
  }

  const onMouseLeave = (key) => {
    updateHoveredElements((currentElements) => ({
      ...currentElements,
      [key]: false,
    }))
  }

  const getHeaderView = (group) => {
    return (
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
          <div className='invite-players__invites-header-right-count'>({Object.keys(groupData[group]).length})</div>
          <div
            className={classNames([
              'invite-players__invites-header-arrow',
              showOptions[group] ? 'invite-players__invites-header-arrow-down' : '',
            ])}>
            >
          </div>
        </div>
      </div>
    )
  }

  const getInvitesListView = (group) => {
    const data = groupData[group]
    console.log('data: ', data)

    return (
      <div
        className={classNames(['invite-players__player-list-container', showOptions[group] ? '' : 'invite-players__player-list-hidden'])}>
        {Object.keys(data).map((key) => {
          return (
            <div
              onMouseEnter={() => {
                handleMouseHover(key)
              }}
              onMouseLeave={() => {
                onMouseLeave(key)
              }}
              className={classNames([
                'invite-players__player-list-element',
                hoveredElements[key] ? '' : 'invite-players__player-list-element-hovered',
              ])}>
              <img src={data[key].img} height={20} width={20} className='invite-players__player-image' />
              <div className='invite-players__player-list-text'>{data[key].name}</div>
              <img
                className={
                  hoveredElements[key]
                    ? 'invite-players__player-list-element-delete-hoverred'
                    : 'invite-players__player-list-element-delete'
                }
                src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/X+icon.svg'
                height={20}
                width={20}
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className='invite-players__invites-area-container'>
      {GROUP_LIST.map((group) => {
        return (
          <div className='invite-players__invites-area-tile-container'>
            {getHeaderView(group)}
            {getInvitesListView(group)}
          </div>
        )
      })}
    </div>
  )
}

export default SelectedInvites
