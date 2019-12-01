import axios from 'axios'
import moment from 'moment'

export async function PullDataFunction(myG) {
  var myGame_name_box = null,
    myVisibility = 1,
    myRegion = null,
    myExperience = null,
    myPlatform = null,
    myDescription_box = null,
    myOther_box = null,
    myLimit = 0,
    check_full_games = true,
    startDate = moment()
      .subtract(5, 'seconds')
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss'),
    tmp_endDate = moment().utc(),
    endDate = moment().utc(),
    dota2_medal_ranks = null,
    dota2_server_regions = null,
    dota2_roles = null,
    clash_royale_trophies = null

  if (
    myG.visibility_box != undefined &&
    myG.visibility_box != null &&
    myG.visibility_box != ''
  ) {
    myVisibility = myG.visibility_box.value
  }

  if (
    myG.selected_region != undefined &&
    myG.selected_region != null &&
    myG.selected_region != ''
  ) {
    myRegion = myG.selected_region.value
  }

  if (
    myG.selected_experience != undefined &&
    myG.selected_experience != null &&
    myG.selected_experience != ''
  ) {
    myExperience = myG.selected_experience.value
  }

  if (
    myG.selected_platform != undefined &&
    myG.selected_platform != null &&
    myG.selected_platform != ''
  ) {
    myPlatform = myG.selected_platform.value
  }

  if (
    myG.dota2_medal_ranks != undefined &&
    myG.dota2_medal_ranks != null &&
    myG.dota2_medal_ranks != ''
  ) {
    dota2_medal_ranks = myG.dota2_medal_ranks.value
  }

  if (
    myG.dota2_server_regions != undefined &&
    myG.dota2_server_regions != null &&
    myG.dota2_server_regions != ''
  ) {
    dota2_server_regions = myG.dota2_server_regions.value
  }

  if (
    myG.dota2_roles != undefined &&
    myG.dota2_roles != null &&
    myG.dota2_roles != ''
  ) {
    dota2_roles = myG.dota2_roles.value
  }

  if (
    myG.clash_royale_trophies != undefined &&
    myG.clash_royale_trophies != null &&
    myG.clash_royale_trophies != ''
  ) {
    clash_royale_trophies = myG.clash_royale_trophies.value
  }

  if (myG.when != undefined && myG.when != null) {
    switch (myG.when.value) {
      case 'Now-ish':
        endDate = tmp_endDate.add(4, 'hour').format('YYYY-MM-DDTHH:mm:ss')
        break
      case '8 hours':
        endDate = tmp_endDate.add(8, 'hour').format('YYYY-MM-DDTHH:mm:ss')
        break
      case '2 days':
        endDate = tmp_endDate.add(2, 'day').format('YYYY-MM-DDTHH:mm:ss')
        break
      case '7 days':
        endDate = tmp_endDate.add(7, 'day').format('YYYY-MM-DDTHH:mm:ss')
        break
      case '14 days':
        endDate = tmp_endDate.add(14, 'day').format('YYYY-MM-DDTHH:mm:ss')
        break
      default:
        endDate = tmp_endDate.add(2000, 'years').format('YYYY-MM-DDTHH:mm:ss')
    }
  }

  if (myG.game_name_box != null && myG.game_name_box != '') {
    myGame_name_box = myG.game_name_box.value
  }

  if (myG.description_box != '' && myG.description_box != undefined) {
    myDescription_box = myG.description_box
  }

  myLimit = myG.db_row_counter

  try {
    const allscheduledGames = await axios.post(
      '/api/ScheduleGame/scheduleSearchResults',
      {
        game_name: myGame_name_box,
        region: myRegion,
        experience: myExperience,
        start_date_time: startDate,
        end_date_time: endDate,
        platform: myPlatform,
        description: myDescription_box,
        other: myOther_box,
        visibility: myVisibility,
        limit_clause: myLimit,
        vacancy: check_full_games,
        dota2_medal_ranks: dota2_medal_ranks,
        dota2_server_regions: dota2_server_regions,
        dota2_roles: dota2_roles,
        clash_royale_trophies: clash_royale_trophies,
      }
    )
    return allscheduledGames
  } catch (error) {
    console.log(error)
  }
}
