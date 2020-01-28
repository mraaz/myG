import axios from 'axios'
import moment from 'moment'
import uuid from 'uuid'

export async function SubmitDataFunction(myG) {
  var myRegion = ''
  var myExperience = ''
  var myPlatform = ''
  var myVisibility = 1
  var myLimit = 42
  var myDota2_medal_ranks = ''
  var myDota2_server_regions = ''
  var myDota2_roles = ''
  var myClash_royale_trophies = ''
  var now = moment()
  var end_date = myG.endDate

  if (myG.selected_region != undefined && myG.selected_region !== null && myG.selected_region.length !== 0) {
    for (var i = 0; i < myG.selected_region.length; i++) {
      myRegion += myG.selected_region[i].value + '; '
    }
    myRegion = myRegion
      .trim()
      .replace(/; /g, ',')
      .trim()
    myRegion = myRegion.replace(/;/g, '')
    myRegion = myRegion.replace(/,/g, ', ')
  }

  if (myG.selected_experience !== undefined && myG.selected_experience !== null && myG.selected_experience.length !== 0) {
    for (var i = 0; i < myG.selected_experience.length; i++) {
      myExperience += myG.selected_experience[i].value + '; '
    }
    myExperience = myExperience
      .trim()
      .replace(/; /g, ',')
      .trim()
    myExperience = myExperience.replace(/;/g, '')
    myExperience = myExperience.replace(/,/g, ', ')
  }

  if (myG.selected_platform !== undefined && myG.selected_platform !== null && myG.selected_platform.length !== 0) {
    for (var i = 0; i < myG.selected_platform.length; i++) {
      myPlatform += myG.selected_platform[i].value + '; '
    }
    myPlatform = myPlatform
      .trim()
      .replace(/; /g, ',')
      .trim()
    myPlatform = myPlatform.replace(/;/g, '')
    myPlatform = myPlatform.replace(/,/g, ', ')
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

  if (myG.selected_visibility != null || myG.selected_visibility != undefined) {
    myVisibility = myG.selected_visibility.value
  }

  if (myG.selected_limit != null || myG.selected_limit != undefined) {
    myLimit = myG.selected_limit.value
  }

  if (myG.clash_royale_trophy != null || myG.clash_royale_trophy != undefined) {
    myClash_royale_trophies = myG.clash_royale_trophy.value
  }

  if (myG.dota2_medal_ranks !== undefined && myG.dota2_medal_ranks !== null && myG.dota2_medal_ranks.length !== 0) {
    for (var i = 0; i < myG.dota2_medal_ranks.length; i++) {
      myDota2_medal_ranks += myG.dota2_medal_ranks[i].value + '; '
    }
    myDota2_medal_ranks = myDota2_medal_ranks
      .trim()
      .replace(/; /g, ',')
      .trim()
    myDota2_medal_ranks = myDota2_medal_ranks.replace(/;/g, '')
    myDota2_medal_ranks = myDota2_medal_ranks.replace(/,/g, ', ')
  }

  if (myG.dota2_server_regions !== undefined && myG.dota2_server_regions !== null && myG.dota2_server_regions.length !== 0) {
    for (var i = 0; i < myG.dota2_server_regions.length; i++) {
      myDota2_server_regions += myG.dota2_server_regions[i].value + '; '
    }
    myDota2_server_regions = myDota2_server_regions
      .trim()
      .replace(/; /g, ',')
      .trim()
    myDota2_server_regions = myDota2_server_regions.replace(/;/g, '')
    myDota2_server_regions = myDota2_server_regions.replace(/,/g, ', ')
  }

  if (myG.dota2_roles !== undefined && myG.dota2_roles !== null && myG.dota2_roles.length !== 0) {
    for (var i = 0; i < myG.dota2_roles.length; i++) {
      myDota2_roles += myG.dota2_roles[i].value + '; '
    }
    myDota2_roles = myDota2_roles
      .trim()
      .replace(/; /g, ',')
      .trim()
    myDota2_roles = myDota2_roles.replace(/;/g, '')
    myDota2_roles = myDota2_roles.replace(/,/g, ', ')
  }

  const uuidv1 = require('uuid/v1')
  var tmp = uuidv1()

  try {
    const post = axios.post('/api/ScheduleGame', {
      game_name_box: myG.game_name_box.value,
      selected_region: myRegion,
      selected_experience: myExperience,
      start_date_time: myG.startDate,
      end_date_time: end_date,
      selected_platform: myPlatform,
      description_box: myG.description_box,
      other_box: myG.other_box,
      selected_expiry: now,
      visibility: myVisibility,
      limit: myLimit,
      accept_msg: myG.txtAreaValue.trim(),
      dota2_medal_ranks: myDota2_medal_ranks,
      dota2_server_regions: myDota2_server_regions,
      dota2_roles: myDota2_roles,
      schedule_games_GUID: tmp,
      clash_royale_trophies: myClash_royale_trophies,
    })
  } catch (error) {
    console.log(error)
  }
}
