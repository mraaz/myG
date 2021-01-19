import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { logToElasticsearch } from '../../integration/http/logger'

const createOption = (label, game_names_id, gameImg, game_name_fields_img, additional_info, game_headers) => ({
  label,
  value: label,
  game_names_id,
  gameImg,
  game_name_fields_img,
  additional_info: false,
  game_headers,
})

const createOption_GameTags = (label, game_tag_id) => ({
  label,
  value: label,
  game_tag_id,
})

const createOption_GameSkills = (label, game_skill_id) => ({
  label,
  value: label,
  game_skill_id,
})

const createOption_HashTags = (label, hash_tag_id) => ({
  label,
  value: label,
  hash_tag_id,
})

const createOption_GrpHashTags = (label, group_hash_tag_id) => ({
  label,
  value: label,
  group_hash_tag_id,
})

export async function Game_name_values(inputValue) {
  let getGameName = ''

  if (inputValue == '' || inputValue == undefined) {
    getGameName = await axios.get('/api/GameNames/getTopGames')
  } else {
    inputValue = inputValue.trimStart()
    getGameName = await axios.get(`/api/GameNames/${inputValue}/gameSearchResults`)
  }
  try {
    let results = []

    if (inputValue != '' && inputValue != undefined) {
      results = getGameName.data.gameSearchResults.filter((i) => i.game_name.toLowerCase().includes(inputValue.toLowerCase()))
    } else {
      results = getGameName.data.gameSearchResults
    }
    var newArr = []
    var i, newOption
    if (results.length != 0) {
      for (i = 0; i < results.length; i++) {
        if (results[i].game_img != '' && results[i].game_img != null) {
          newOption = createOption(
            results[i].game_name,
            results[i].id,
            results[i].game_img,
            results[i].game_name_fields_img,
            false,
            results[i].game_headers
          )
          newOption.label = <img src={results[i].game_img} />
        } else {
          newOption = createOption(
            results[i].game_name,
            results[i].id,
            null,
            results[i].game_name_fields_img,
            false,
            results[i].game_headers
          )
        }
        if (results[i].more_data != null) {
          newOption.additional_info = true
        }
        newArr.push(newOption)
      }
    } else {
      return []
    }
    return newArr
  } catch (error) {
    logToElasticsearch('error', 'Utility_Function', 'Failed Game_name_values:' + ' ' + error)
  }
}

export async function Game_name_Tags(inputValue, game_names_id) {
  if (inputValue != undefined) {
    inputValue = inputValue.trimStart()
    if (inputValue.length <= 250) {
      inputValue = inputValue.substr(0, 250)
    }
  }

  var allTags
  if (inputValue == '' || inputValue == undefined) {
    allTags = await axios.post('/api/Tags/getTopTagsforGames', {
      game_names_id: game_names_id,
    })
  } else {
    allTags = await axios.post('/api/Tags/getTagsforGames', {
      inputValue: inputValue,
      game_names_id: game_names_id,
    })
  }
  try {
    var newArr = []
    var i, newOption

    for (i = 0; i < allTags.data.allTags.length; i++) {
      newOption = createOption(allTags.data.allTags[i].tag, allTags.data.allTags[i].id)
      newArr.push(newOption)
    }
    return newArr
  } catch (error) {
    logToElasticsearch('error', 'Utility_Function', 'Failed Game_name_Tags:' + ' ' + error)
  }
}

export async function Schedule_Game_Tags(inputValue, gameId, noTopGameTags) {
  let allTags
  if (!noTopGameTags && (inputValue == '' || inputValue == undefined)) {
    allTags = await axios.get('/api/GameTags/getTopGameTags')
  } else {
    allTags = await axios.post('/api/GameTags/getGameTags', {
      content: inputValue,
      game_names_id: gameId,
    })
  }
  try {
    var newArr = []
    var i, newOption

    if (allTags.data && allTags.data.allTags) {
      for (i = 0; i < allTags.data.allTags.length; i++) {
        newOption = createOption_GameTags(allTags.data.allTags[i].content, allTags.data.allTags[i].id)
        newArr.push(newOption)
      }
    }
    return newArr
  } catch (error) {
    logToElasticsearch('error', 'Utility_Function', 'Failed Schedule_Game_Tags:' + ' ' + error)
  }
}

export async function Schedule_Game_Skills(inputValue) {
  let allSkills

  if (inputValue == '' || inputValue == undefined) {
    allSkills = await axios.get('/api/GameSkills/getTopGameSkills')
  } else {
    allSkills = await axios.post('/api/GameSkills/getGameSkills', {
      content: inputValue,
    })
  }
  try {
    var newArr = []
    var i, newOption

    if (allSkills.data && allSkills.data.allSkills) {
      for (i = 0; i < allSkills.data.allSkills.length; i++) {
        newOption = createOption_GameSkills(allSkills.data.allSkills[i].content, allSkills.data.allSkills[i].id)
        newArr.push(newOption)
      }
    }
    return newArr
  } catch (error) {
    logToElasticsearch('error', 'Utility_Function', 'Failed Schedule_Game_Skills:' + ' ' + error)
  }
}

export async function Group_Hash_Tags(inputValue) {
  let allTags

  if (inputValue == '' || inputValue == undefined) {
    allTags = await axios.get('/api/GroupHashTags/getTopGameTags')
  } else {
    allTags = await axios.post('/api/GroupHashTags/getGameTags', {
      content: inputValue,
    })
  }
  try {
    var newArr = []
    var i, newOption

    if (allTags.data && allTags.data.allTags) {
      for (i = 0; i < allTags.data.allTags.length; i++) {
        newOption = createOption_GrpHashTags(allTags.data.allTags[i].content, allTags.data.allTags[i].id)
        newArr.push(newOption)
      }
    }
    return newArr
  } catch (error) {
    logToElasticsearch('error', 'Utility_Function', 'Failed Group_Hash_Tags:' + ' ' + error)
  }
}

export async function Hash_Tags(inputValue) {
  if (inputValue != undefined) {
    inputValue = inputValue.trimStart()
    if (inputValue.length <= 88) {
      inputValue = inputValue.substr(0, 88)
    }
  }

  let allTags

  if (inputValue == '' || inputValue == undefined) {
    allTags = await axios.get('/api/HashTags/getTopHashTags')
  } else {
    allTags = await axios.post('/api/HashTags/getHashTags', {
      content: inputValue,
    })
  }
  try {
    let newArr = []
    let i, newOption
    if (allTags.data.allTags) {
      for (i = 0; i < allTags.data.allTags.length; i++) {
        newOption = createOption_HashTags(allTags.data.allTags[i].content, allTags.data.allTags[i].id)
        newArr.push(newOption)
      }
    }
    return newArr
  } catch (error) {
    logToElasticsearch('error', 'Utility_Function', 'Failed Hash_Tags:' + ' ' + error)
    return []
  }
}

export function Disable_keys(e) {
  if (
    e.keyCode === 222 ||
    e.keyCode === 191 ||
    e.keyCode === 190 ||
    e.keyCode === 220 ||
    (e.keyCode === 53 && e.shiftKey) ||
    (e.keyCode === 51 && e.shiftKey) ||
    (e.keyCode === 52 && e.shiftKey) ||
    e.keyCode === 192 ||
    e.keyCode === 188 ||
    e.keyCode === 186
  ) {
    e.preventDefault()
    e.stopPropagation()
    toast.success(<Toast_style text={'Sorry mate! Invalid key for this field.'} />)
  }

  switch (e.key) {
    case 'Home':
      e.preventDefault()
      if (e.shiftKey) e.target.selectionStart = 0
      else e.target.setSelectionRange(0, 0)
      break
    case 'End':
      e.preventDefault()
      const len = e.target.value.length
      if (e.shiftKey) e.target.selectionEnd = len
      else e.target.setSelectionRange(len, len)
      break
  }
}

export const Toast_style = (props) => (
  <div className='individual-toasts'>
    <img width={48} src={'https://myG.gg/logos/Logo.png'}></img>
    <div>{props.text}</div>
  </div>
)

export function Convert_to_comma_delimited_value(array_to_convert) {
  var newArr = []
  for (var i = 0; i < array_to_convert.length; i++) {
    newArr.push(array_to_convert[i].value)
  }
  return newArr.toString()
}
