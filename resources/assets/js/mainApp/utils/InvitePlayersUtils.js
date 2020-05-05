import React from 'react'

const normalizePlayersData = (data) => {
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
    dataObj[item.friend_id] = {
      ...item,
      id: item.friend_id,
      name: item.alias,
      img: item.profile_img,
    }
  })
  return {
    itemsArray,
    dataObj,
  }
}

const normalizeCommunitiesData = (data) => {
  const itemsArray = []
  const dataObj = {}

  if (!data) {
    return {
      itemsArray,
      dataObj,
    }
  }
  data.map((item) => {
    itemsArray.push(item.id)
    dataObj[item.id] = {
      ...item,
      img: item.group_img,
    }
  })
  return {
    itemsArray,
    dataObj,
  }
}

const normalizeGroupsData = (data) => {
  const itemsArray = []
  const dataObj = {}

  if (!data) {
    return {
      itemsArray,
      dataObj,
    }
  }
  data.map((item) => {
    itemsArray.push(item.chatId)
    dataObj[item.chatId] = {
      ...item,
      id: item.chatId,
      name: item.title,
      img: item.icon,
    }
  })
  return {
    itemsArray,
    dataObj,
  }
}

const parsePlayersToSelectData = (data) => {
  const selectData = []
  console.log('data:', data)
  if (data && data.length) {
    data.forEach((player) => {
      selectData.push({
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img style={{ display: 'inline', marginRight: '10px', borderRadius: '30px' }} src={player.profile_img} height={20} width={20} />
            <div style={{ display: 'inline' }}>{player.first}</div>
          </div>
        ),
        id: player.id,
        value: player.first,
        name: player.alias,
        img: player.profile_img,
      })
    })
  }

  return selectData
}

const parseCommunitiesToSelectData = (data) => {
  const selectData = []
  if (data && data.length) {
    data.forEach((community) => {
      selectData.push({
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              style={{ display: 'inline', marginRight: '10px', borderRadius: '30px' }}
              src={community.group_img}
              height={20}
              width={20}
            />
            <div style={{ display: 'inline' }}>{community.name}</div>
          </div>
        ),
        id: community.id,
        value: community.name,
      })
    })
  }

  return selectData
}

const parseGroupsToSelectData = (data) => {
  const selectData = []
  if (data && data.length) {
    data.forEach((group) => {
      selectData.push({
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img style={{ display: 'inline', marginRight: '10px', borderRadius: '30px' }} src={group.icon} height={20} width={20} />
            <div style={{ display: 'inline' }}>{group.title}</div>
          </div>
        ),
        id: group.chatId,
        value: group.title,
      })
    })
  }

  return selectData
}

export {
  normalizePlayersData,
  normalizeCommunitiesData,
  normalizeGroupsData,
  parseCommunitiesToSelectData,
  parsePlayersToSelectData,
  parseGroupsToSelectData,
}
