import { Convert_to_comma_delimited_value } from './Utility_Function'

import axios from 'axios'
import moment from 'moment'
import uuid from 'uuid'

export async function SubmitDataFunction(myG) {
  let myRegion = null,
    myExperience = null,
    myPlatform = null,
    now = moment(),
    end_date = myG.endDate,
    myLimit = 0,
    autoJoin = true,
    repeat_game = undefined,
    co_hosts = null,
    tags = []

  if (myG.selected_region != undefined && myG.selected_region !== null && myG.selected_region.length !== 0) {
    myRegion = Convert_to_comma_delimited_value(myG.selected_region)
  }

  if (myG.selected_experience !== undefined && myG.selected_experience !== null && myG.selected_experience.length !== 0) {
    myExperience = Convert_to_comma_delimited_value(myG.selected_experience)
  }

  if (myG.selected_platform !== undefined && myG.selected_platform !== null && myG.selected_platform.length !== 0) {
    myPlatform = Convert_to_comma_delimited_value(myG.selected_platform)
  }

  if (myG.coHosts) {
    co_hosts = Convert_to_comma_delimited_value(myG.coHosts)
  }

  if (myG.tags != undefined && myG.tags.length != 0 && myG.tags != null) {
    for (var i = 0; i < myG.tags.length; i++) {
      if (/['/.%#$,;`\\]/.test(myG.tags[i].value)) {
        toast.success(<Toast_style text={'Sorry mate! Game tags can not have invalid fields'} />)
        return
      }

      delete myG.tags[i].label

      // if (myG.tags[i].game_tag_id == null) {
      //   const new_GameTags = await axios.post('/api/GameTags', {
      //     content: myG.tags[i].value,
      //   })
      //   tags.push(new_GameTags.data)
      // } else {
      //   tags.push(myG.tags[i].game_tag_id)
      // }
    }
    tags = JSON.stringify(myG.tags)
  }

  if (myG.endDate != null || myG.endDate != undefined) {
    now = moment(myG.endDate)
    now.add(8, 'hour')
  } else {
    now = moment(myG.startDate)
    end_date = moment(now)
    end_date.add(18, 'hour')
    now.add(18, 'hour')
  }

  if (myG.selected_limit != null || myG.selected_limit != undefined) {
    if (parseInt(myG.selected_limit) <= 0) {
      myLimit = 0
    } else {
      myLimit = myG.selected_limit
    }
  }

  // if (myG.clash_royale_trophy != null || myG.clash_royale_trophy != undefined) {
  //   myClash_royale_trophies = myG.clash_royale_trophy.value
  // }
  //
  // if (myG.dota2_medal_ranks !== undefined && myG.dota2_medal_ranks !== null && myG.dota2_medal_ranks.length !== 0) {
  //   myDota2_medal_ranks = Convert_to_comma_delimited_value(myG.dota2_medal_ranks)
  // }
  //
  // if (myG.dota2_server_regions !== undefined && myG.dota2_server_regions !== null && myG.dota2_server_regions.length !== 0) {
  //   myDota2_server_regions = Convert_to_comma_delimited_value(myG.dota2_server_regions)
  // }
  //
  // if (myG.dota2_roles !== undefined && myG.dota2_roles !== null && myG.dota2_roles.length !== 0) {
  //   myDota2_roles = Convert_to_comma_delimited_value(myG.dota2_roles)
  // }

  if (myG.autoJoin != null || myG.autoJoin != undefined) {
    autoJoin = myG.autoJoin
  }

  const uuidv1 = require('uuid/v1')
  var tmp = uuidv1()

  try {
    const post = await axios.post('/api/ScheduleGame/update', {
      id: 726,
      game_name_box: myG.game_name_box.value,
      selected_region: myRegion,
      selected_experience: myExperience,
      start_date_time: myG.startDate.format('YYYY-MM-DD HH:mm:ssZ'),
      end_date_time: end_date.format('YYYY-MM-DD HH:mm:ssZ'),
      selected_platform: myPlatform,
      description_box: myG.description_box,
      selected_expiry: now.format('YYYY-MM-DD HH:mm:ssZ'),
      visibility: myG.selected_visibility,
      limit: myLimit,
      accept_msg: myG.txtAreaValue.trim(),
      schedule_games_GUID: tmp,
      allow_comments: myG.allow_comments,
      autoJoin: autoJoin,
      co_hosts: co_hosts,
      repeat_game: repeat_game,
      tags: tags,
      cron: myG.cron,
      occurrence: myG.occurrence,
      repeatEvery: myG.repeatEvery,
      value_one: myG.value_one,
      value_two: myG.value_two,
      value_three: myG.value_three,
      value_four: myG.value_four,
      value_five: myG.value_five,
    })

    // clash_royale_trophies: myClash_royale_trophies,
    // dota2_medal_ranks: myDota2_medal_ranks,
    // dota2_server_regions: myDota2_server_regions,
    // dota2_roles: myDota2_roles,
    return post
  } catch (error) {
    throw error
  }
}
