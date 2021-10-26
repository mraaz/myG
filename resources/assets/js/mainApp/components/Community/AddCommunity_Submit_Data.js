import React from 'react'
import { Convert_to_comma_delimited_value, Toast_style } from '../Utility_Function'
import { toast } from 'react-toastify'

import axios from 'axios'

const MAX_GAME_TAGS = 4

export async function SubmitDataFunction(myG) {
  let co_hosts = null,
    group_img = null,
    aws_key_id = null

  //Some background, this variable was initially called coHosts but later we changed it to friends
  if (myG.coHosts) {
    co_hosts = Convert_to_comma_delimited_value(myG.coHosts)
  }

  // if (myG.tags != undefined && myG.tags.length != 0 && myG.tags != null) {
  //   for (var i = 0; i < MAX_GAME_TAGS && i < myG.tags.length; i++) {
  //     if (/['/.%#$,;`\\]/.test(myG.tags[i].value)) {
  //       toast.success(<Toast_style text={'Sorry mate! Community tags can not have invalid fields'} />)
  //       return
  //     }
  //
  //     delete myG.tags[i].label
  //   }
  //
  //   tags = JSON.stringify(myG.tags)
  // }

  if (myG.preview_files && myG.preview_files[0]) {
    group_img = myG.preview_files[0].src
    aws_key_id = myG.preview_files[0].id
  }

  if (myG.community_name.toUpperCase().includes('MYG OFFICIAL')) {
    toast.success(<Toast_style text={'Whhaatttt! Community name can not have myG official'} />)
    return
  }
  if (myG.community_Clan_Tag) {
    myG.community_Clan_Tag = myG.community_Clan_Tag.replace(/#/g, '')
  }

  try {
    const post = await axios.post('/api/groups/create', {
      game_name_box: myG.game_name_box.value,
      game_names_id: myG.game_name_box.game_names_id,
      name: myG.community_name,
      all_accept: myG.autoAccept,
      grp_description: myG.description,
      co_hosts: co_hosts,
      type: myG.type,
      group_img: group_img,
      aws_key_id: aws_key_id,
      stats_header:myG.community_Clan_Tag
    })
    return post
  } catch (error) {
    throw error
  }
}
