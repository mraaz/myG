import { Convert_to_comma_delimited_value } from '../Utility_Function'

import axios from 'axios'

const MAX_GAME_TAGS = 4

export async function SubmitDataFunction(myG) {
  let co_hosts = null,
    tags = [],
    group_img = null,
    aws_key_id = null

  if (myG.coHosts) {
    co_hosts = Convert_to_comma_delimited_value(myG.coHosts)
  }

  if (myG.tags != undefined && myG.tags.length != 0 && myG.tags != null) {
    for (var i = 0; i < MAX_GAME_TAGS && i < myG.tags.length; i++) {
      if (/['/.%#$,;`\\]/.test(myG.tags[i].value)) {
        toast.success(<Toast_style text={'Sorry mate! Game tags can not have invalid fields'} />)
        return
      }

      delete myG.tags[i].label
    }

    tags = JSON.stringify(myG.tags)
  }

  if (myG.preview_files && myG.preview_files[0]) {
    group_img = myG.preview_files[0].src
    aws_key_id = myG.preview_files[0].id
  }

  try {
    const post = await axios.post('/api/groups/create', {
      game_name_box: myG.game_name_box.value,
      game_names_id: myG.game_name_box.game_names_id,
      name: myG.community_name,
      all_accept: myG.autoAccept,
      grp_description: myG.description,
      tags: tags,
      co_hosts: co_hosts,
      type: myG.type,
      group_img: group_img,
      aws_key_id: aws_key_id,
    })
    return post
  } catch (error) {
    throw error
  }
}
