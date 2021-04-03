/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import axios from 'axios'
import moment from 'moment'

const queryMapping = {
  0: 'one',
  1: 'two',
  2: 'three',
  3: 'four',
  4: 'five',
}

export async function PullDataFunction(myG) {
  const now = moment().utc();
  let myGame_name_box = null,
    myRegion = null,
    myExperience = null,
    myPlatform = null,
    myLanguage = null,
    myDescription_box = null,
    counter = 0,
    show_full_games = true,
    startDate = null,
    tmp_startDate = now,
    endDate = now,
    tags = [],
    count = 0,
    extraFields = myG.extraFields || {}
  if (Object.keys(extraFields).length > 0) {
    Object.keys(extraFields).forEach((key, index) => {
      let value = ''
      if (Array.isArray(extraFields[key]) && extraFields[key].length > 0) {
        value = extraFields[key].map((item) => item.value).toString()
      } else if (typeof extraFields[key] == 'object') {
        value = extraFields[key].value ? extraFields[key].value : null
      }
      myG[`value_${queryMapping[index]}`] = { [key]: value }
      count++
    })
  }

  if (myG.region != undefined && myG.region != null && myG.region != '') {
    myRegion = myG.region.value
  }

  if (myG.experience != undefined && myG.experience != null && myG.experience != '') {
    myExperience = myG.experience.value
  }

  if (myG.platform != undefined && myG.platform != null && myG.platform != '') {
    myPlatform = myG.platform.value
  }

  if (myG.language != undefined && myG.language != null && myG.language != '') {
    myLanguage = myG.language.value
  }

  if (myG.start_time != undefined && myG.start_time != null) {
    switch (myG.start_time.value) {
      case 'Now-ish':
        startDate = tmp_startDate.add(4, 'hour').format('YYYY-MM-DDTHH:mm:ss')
        break
      case '8 hours':
        startDate = tmp_startDate.add(8, 'hour').format('YYYY-MM-DDTHH:mm:ss')
        break
      case '2 days':
        startDate = tmp_startDate.add(2, 'day').format('YYYY-MM-DDTHH:mm:ss')
        break
      case '7 days':
        startDate = tmp_startDate.add(7, 'day').format('YYYY-MM-DDTHH:mm:ss')
        break
      case '14 days':
        startDate = tmp_startDate.add(14, 'day').format('YYYY-MM-DDTHH:mm:ss')
        break
      default:
        startDate = tmp_startDate.add(2000, 'years').format('YYYY-MM-DDTHH:mm:ss')
    }
  }

  if (myG.game_name != null && myG.game_name != '') {
    myGame_name_box = myG.game_name
  }

  if (myG.description != '' && myG.description != undefined) {
    myDescription_box = myG.description
  }

  if (myG.tags != undefined && myG.tags.length != 0 && myG.tags != null) {
    for (var i = 0; i < myG.tags.length; i++) {
      if (/['/.%#$,;`\\]/.test(myG.tags[i].value)) {
        toast.success(<Toast_style text={'Sorry mate! Game tags can not have invalid fields'} />)
        return
      }
      if (myG.tags[i].game_tag_id == null) {
        continue
      } else {
        tags.push(myG.tags[i].game_tag_id)
      }
    }

    tags = tags.toString()
  }

  counter = myG.counter

  try {
    const allscheduledGames = await axios.post('/api/ScheduleGame/scheduleSearchResults', {
      game_name: myGame_name_box,
      region: myRegion,
      experience: myExperience,
      start_date_time: startDate,
      end_date_time: null /* We don't have a filter for this anyways */,
      platform: myPlatform,
      description: myDescription_box,
      counter: counter,
      vacancy: show_full_games,
      tags: tags,
      value_one: myG.value_one,
      value_two: myG.value_two,
      value_three: myG.value_three,
      value_four: myG.value_four,
      value_five: myG.value_five,
      mic: myG.mic ? myG.mic.value : null,
      eighteen_plus: myG.eighteen_plus ? myG.eighteen_plus.value : null,
      game_languages: myLanguage,
    })
    return allscheduledGames
  } catch (error) {
    console.log(error)
  }
}
