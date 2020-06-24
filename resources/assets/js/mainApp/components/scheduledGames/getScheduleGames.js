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
  let myGame_name_box = null,
    myRegion = null,
    myExperience = null,
    myPlatform = null,
    myDescription_box = null,
    counter = 0,
    show_full_games = true,
    startDate = moment().utc(),
    tmp_startDate = moment().utc(),
    endDate = moment().utc(),
    tags = [],
    count = 0,
    extraFields = myG.extraFields || {}
  if (Object.keys(extraFields).length > 0) {
    Object.keys(extraFields).forEach((key, index) => {
      let value = ''
      if (Array.isArray(extraFields[key]) && extraFields[key].length > 0) {
        value = extraFields[key][0].value
      } else if (typeof extraFields[key] == 'object') {
        value = extraFields[key].value
      }
      myG[`value_${queryMapping[index]}`] = { [key]: value }
      count++
    })
  }

  if (myG.selected_region != undefined && myG.selected_region != null && myG.selected_region != '') {
    myRegion = myG.selected_region.value
  }

  if (myG.selected_experience != undefined && myG.selected_experience != null && myG.selected_experience != '') {
    myExperience = myG.selected_experience.value
  }

  if (myG.selected_platform != undefined && myG.selected_platform != null && myG.selected_platform != '') {
    myPlatform = myG.selected_platform.value
  }

  if (myG.when != undefined && myG.when != null) {
    switch (myG.when.value) {
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

  if (myG.game_name_box != null && myG.game_name_box != '') {
    myGame_name_box = myG.game_name_box.value
  }

  if (myG.description_box != '' && myG.description_box != undefined) {
    myDescription_box = myG.description_box
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
      end_date_time: endDate,
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
    })
    return allscheduledGames
  } catch (error) {
    console.log(error)
  }
}
