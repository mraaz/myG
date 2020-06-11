import React from 'react'
import axios from 'axios'

const createOption = (label, game_names_id, isGameNameField, gameImg) => ({
  label,
  value: label,
  game_names_id,
  isGameNameField,
  gameImg,
})

const createOption_GameTags = (label, game_tag_id) => ({
  label,
  value: label,
  game_tag_id,
})

const createOption_HashTags = (label, hash_tag_id) => ({
  label,
  value: label,
  hash_tag_id,
})

export async function Game_name_values(inputValue) {
  inputValue = inputValue.trimStart()
  if (inputValue == '' || inputValue == undefined) {
    return []
  }
  try {
    const getGameName = await axios.get(`/api/GameNames/${inputValue}/gameSearchResults`)
    var results = getGameName.data.gameSearchResults.filter((i) => i.game_name.toLowerCase().includes(inputValue.toLowerCase()))
    var newArr = []
    var i, newOption
    if (results.length != 0) {
      for (i = 0; i < results.length; i++) {
        if (results[i].game_img != '' && results[i].game_img != null) {
          newOption = createOption(results[i].game_name, results[i].id, results[i].game_name_fields, results[i].game_img)
          newOption.label = <img src={results[i].game_img} />
        } else {
          newOption = createOption(results[i].game_name, results[i].id)
        }
        newArr.push(newOption)
      }
    } else {
      return []
    }

    return newArr
  } catch (error) {
    console.log(error)
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
    console.log(error)
  }
}

export async function Schedule_Game_Tags(inputValue) {
//  if (inputValue != undefined) {
//    inputValue = inputValue.trimStart()
//    if (inputValue.length <= 250) {
//      inputValue = inputValue.substr(0, 250)
//    }
//  }

  let allTags

  if (inputValue == '' || inputValue == undefined) {
    allTags = await axios.get('/api/GameTags/getTopGameTags')
  } else {
    allTags = await axios.post('/api/GameTags/getGameTags', {
      content: inputValue,
    })
  }
  try {
    var newArr = []
    var i, newOption

    for (i = 0; i < allTags.data.allTags.length; i++) {
      newOption = createOption_GameTags(allTags.data.allTags[i].content, allTags.data.allTags[i].id)
      newArr.push(newOption)
    }
    return newArr
  } catch (error) {
    console.log(error)
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
    console.log(error)
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
  }
}

export const Toast_style = (props) => (
  <div className='individual-toasts'>
    <img width={48} src={'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/Logo.png'}></img>
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
