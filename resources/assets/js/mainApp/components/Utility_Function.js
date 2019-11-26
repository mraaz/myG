import React from "react"
import axios from "axios"

const createOption = (label: string, game_names_id: string) => ({
label,
  value: label,
  game_names_id,
})

export async function Game_name_values (inputValue) {

  if ( (inputValue == "") || (inputValue == undefined) ){
    return []
  }
  try{
    inputValue = inputValue.trimStart()
    const getGameName = await axios.get(`/api/GameNames/${inputValue}/gameSearchResults`)
    var results =  getGameName.data.gameSearchResults[0].filter(i =>
      i.game_name.toLowerCase().includes(inputValue.toLowerCase()));
    var newArr = []
    var i, newOption
    if (results.length != 0){
      for(i=0; i < results.length; i++){
        if ( (results[i].game_img != '') && (results[i].game_img != null) ){
          newOption = createOption(results[i].game_name, results[i].id )
          newOption.label = <img src={results[i].game_img}/>
        }else {
          newOption = createOption(results[i].game_name, results[i].id )
        }
        newArr.push(newOption)
      }
    } else {
      return []
    }

    return newArr

  } catch(error){
    console.log(error)
  }
}

export function Disable_keys (e) {
  if (e.keyCode === 222 || e.keyCode === 191 || e.keyCode === 190 || e.keyCode === 220 || e.keyCode === 53 || e.keyCode === 51 || e.keyCode === 191) {
    e.preventDefault()
    e.stopPropagation()
  }
}
