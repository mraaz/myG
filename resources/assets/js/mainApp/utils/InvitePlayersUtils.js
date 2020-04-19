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
  if (data && data.length) {
    data.forEach((player) => {
      selectData.push({
        label: player.first,
        id: player.id,
        value: player.first,
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
        label: community.name,
        id: community.id,
        value: community.name,
      })
    })
  }

  return selectData
}

export { normalizePlayersData, normalizeCommunitiesData, normalizeGroupsData, parseCommunitiesToSelectData, parsePlayersToSelectData }
