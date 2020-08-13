import { Convert_to_comma_delimited_value } from '../Utility_Function'

import axios from 'axios'

const MAX_GAME_TAGS = 9

export async function SubmitDataFunction(myG) {
  let co_hosts = null,
    tags = []

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

  //group_img: this.state.file_src ? this.state.file_src : null,
  //type: this.state.privacy_box.value,
  try {
    const post = await axios.post('/api/groups/create', {
      name: myG.community_name,
      all_accept: myG.autoAccept,
      grp_description: myG.description,
      tags: tags,
      co_hosts: co_hosts,
      type: myG.type,
    })
    return post
  } catch (error) {
    throw error
  }
}
