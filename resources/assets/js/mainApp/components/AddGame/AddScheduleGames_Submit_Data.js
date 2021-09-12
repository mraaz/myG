import { Convert_to_comma_delimited_value } from '../Utility_Function'
import axios from 'axios'
import moment from 'moment'
import { logToElasticsearch } from '../../../integration/http/logger'

const MAX_GAME_TAGS = 9

export async function SubmitDataFunction(myG) {
  let myRegion = null,
    myExperience = null,
    myPlatform = null,
    myLanguages = null,
    now = moment(),
    end_date = myG.endDate,
    myLimit = 0,
    autoJoin = true,
    repeat_game = undefined,
    co_hosts = null,
    tags = [],
    team_id = null

  if (myG.selected_region != undefined && myG.selected_region != null && myG.selected_region.length != 0) {
    myRegion = Convert_to_comma_delimited_value(myG.selected_region)
  }

  if (myG.selected_experience != undefined && myG.selected_experience != null && myG.selected_experience.length != 0) {
    myExperience = Convert_to_comma_delimited_value(myG.selected_experience)
  }

  if (myG.selected_platform != undefined && myG.selected_platform != null && myG.selected_platform.length != 0) {
    myPlatform = Convert_to_comma_delimited_value(myG.selected_platform)
  }

  if (myG.language != undefined && myG.language != null && myG.language.length != 0) {
    myLanguages = Convert_to_comma_delimited_value(myG.language)
  }

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

  if (myG.team && myG.team.team_id) team_id = myG.team.team_id

  if (myG.show_times == false) {
    myG.startDate = moment()
    end_date = moment()
    end_date.add(4, 'hour')
    now.add(4, 'hour')
  }

  if (myG.show_times == true && (myG.endDate != undefined || myG.endDate != null)) {
    now = moment(myG.endDate)
    now.add(8, 'hour')
  } else {
    now = moment(myG.startDate)
    end_date = moment(now)
    end_date.add(4, 'hour')
    now.add(4, 'hour')
  }

  if (myG.selected_limit != null || myG.selected_limit != undefined) {
    if (parseInt(myG.selected_limit) <= 0) {
      myLimit = 0
    } else {
      myLimit = myG.selected_limit
    }
  }

  if (myG.autoJoin != null || myG.autoJoin != undefined) {
    autoJoin = myG.autoJoin
  }

  try {
    const post = await axios.post('/api/ScheduleGame', {
      game_name_box: myG.game_name_box.value,
      game_names_id: myG.game_name_box.game_names_id,
      selected_region: myRegion,
      selected_experience: myExperience,
      start_date_time: myG.startDate.format('YYYY-MM-DD HH:mm:ss ZZ'),
      end_date_time: end_date.format('YYYY-MM-DD HH:mm:ss ZZ'),
      selected_platform: myPlatform,
      description_box: myG.description_box,
      selected_expiry: now.format('YYYY-MM-DD HH:mm:ss ZZ'),
      visibility: myG.selected_visibility,
      limit: myLimit,
      accept_msg: myG.txtAreaValue.trim(),
      //schedule_games_GUID: tmp,
      allow_comments: myG.allow_comments,
      autoJoin: autoJoin,
      co_hosts: co_hosts,
      repeat_game: repeat_game,
      tags: tags,
      team_id: team_id,
      cron: myG.cron,
      occurrence: myG.occurrence,
      repeatEvery: myG.repeatEvery,
      value_one: myG.value_one,
      value_two: myG.value_two,
      value_three: myG.value_three,
      value_four: myG.value_four,
      value_five: myG.value_five,
      autoJoinHost: myG.autoJoinHost,
      mic: myG.mic,
      eighteen_plus: myG.eighteen_plus,
      game_languages: myLanguages
    })
    return post
  } catch (error) {
    logToElasticsearch('error', 'AddScheduleGames_Submit_Data', 'Failed Add Game - SubmitDataFunction ' + ' ' + error)
  }
}
