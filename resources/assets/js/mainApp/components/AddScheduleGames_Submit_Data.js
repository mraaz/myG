import { Convert_to_comma_delimited_value } from './Utility_Function'

import axios from 'axios'
import moment from 'moment'
import uuid from 'uuid'

export async function SubmitDataFunction(myG) {
  var myRegion = ''
  var myExperience = ''
  var myPlatform = ''
  var myLimit = 42
  var myDota2_medal_ranks = ''
  var myDota2_server_regions = ''
  var myDota2_roles = ''
  var myClash_royale_trophies = ''
  var now = moment()
  var end_date = myG.endDate
  let autoJoin = true,
    co_hosts2 = [101, 103, 102],
    repeat_game = undefined,
    co_hosts = null

  if (myG.selected_region != undefined && myG.selected_region !== null && myG.selected_region.length !== 0) {
    myRegion = Convert_to_comma_delimited_value(myG.selected_region)
  }

  if (myG.selected_experience !== undefined && myG.selected_experience !== null && myG.selected_experience.length !== 0) {
    myExperience = Convert_to_comma_delimited_value(myG.selected_experience)
  }

  if (myG.selected_platform !== undefined && myG.selected_platform !== null && myG.selected_platform.length !== 0) {
    myPlatform = Convert_to_comma_delimited_value(myG.selected_platform)
  }

  if (co_hosts2 !== undefined && co_hosts2 !== null && co_hosts2.length !== 0) {
    co_hosts = Convert_to_comma_delimited_value(co_hosts2)
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
    myLimit = myG.selected_limit.value
  }

  if (myG.clash_royale_trophy != null || myG.clash_royale_trophy != undefined) {
    myClash_royale_trophies = myG.clash_royale_trophy.value
  }

  if (myG.dota2_medal_ranks !== undefined && myG.dota2_medal_ranks !== null && myG.dota2_medal_ranks.length !== 0) {
    myDota2_medal_ranks = Convert_to_comma_delimited_value(myG.dota2_medal_ranks)
  }

  if (myG.dota2_server_regions !== undefined && myG.dota2_server_regions !== null && myG.dota2_server_regions.length !== 0) {
    myDota2_server_regions = Convert_to_comma_delimited_value(myG.dota2_server_regions)
  }

  if (myG.dota2_roles !== undefined && myG.dota2_roles !== null && myG.dota2_roles.length !== 0) {
    myDota2_roles = Convert_to_comma_delimited_value(myG.dota2_roles)
  }

  if (myG.autoJoin != null || myG.autoJoin != undefined) {
    autoJoin = myG.autoJoin.value
  }

  const uuidv1 = require('uuid/v1')
  var tmp = uuidv1()

  try {
    const post = await axios.post('/api/ScheduleGame', {
      game_name_box: myG.game_name_box.value,
      selected_region: myRegion,
      selected_experience: myExperience,
      start_date_time: myG.startDate.format('YYYY-MM-DD HH:mm:ssZ'),
      end_date_time: end_date.format('YYYY-MM-DD HH:mm:ssZ'),
      selected_platform: myPlatform,
      description_box: myG.description_box,
      selected_expiry: now.format('YYYY-MM-DD HH:mm:ssZ'),
      visibility: myG.selected_visibility,
      limit: 2,
      accept_msg: myG.txtAreaValue.trim(),
      dota2_medal_ranks: myDota2_medal_ranks,
      dota2_server_regions: myDota2_server_regions,
      dota2_roles: myDota2_roles,
      schedule_games_GUID: tmp,
      clash_royale_trophies: myClash_royale_trophies,
      allow_comments: myG.allow_comments,
      autoJoin: autoJoin,
      co_hosts: co_hosts,
      repeat_game: repeat_game,
    })
    console.log(post)
    return post
  } catch (error) {
    throw error
  }
}
