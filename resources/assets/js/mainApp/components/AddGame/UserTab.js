import React from 'react'

import { MyGCheckbox } from '../common'

const UserTab = ({ dataList, dataObject, selectedItemsObject, onClick }) => {
  if (!dataList || dataList.length == 0) {
    return null
  }

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://cdn.myG.gg/default_user/new-user-profile-picture.png'
  }

  const getIndividualSearchTab = (item, index, selectedItemsObject, onClick) => {
    return (
      <div key={index} className='invite-players__player-profile-container'>
        <div className='invite-players__player-profile'>
          {item.img ? (
            <img onError={addDefaultSrc} src={item.img} height={20} width={20} className='invite-players__player-image' />
          ) : (
            <span className='invite-players__player-image' style={{ height: '20px', width: '20px' }} />
          )}

          <div className='invite-players__player-alias'>{item.name}</div>
        </div>
        <MyGCheckbox
          checked={selectedItemsObject[item.id]}
          onClick={(value) => {
            onClick(item.id)
          }}
          containerStyles={{ marginBottom: 0 }}
        />
      </div>
    )
  }

  return dataList.map((key, index) => getIndividualSearchTab(dataObject[key], index, selectedItemsObject, onClick))
}

export default UserTab
