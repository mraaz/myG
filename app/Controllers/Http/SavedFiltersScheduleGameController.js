'use strict'
const Database = use('Database')
const SavedFiltersScheduleGame = use('App/Models/SavedFiltersScheduleGame')

class SavedFiltersScheduleGameController {
  async store({ auth, request, response }) {
    if (auth.user) {
      if (/['/.%#$,;`\\]/.test(request.input('name'))) {
        return false
      }
      try {
        const newSavedFilter = await SavedFiltersScheduleGame.create({
          user_id: auth.user.id,
          name: request.input('name').trim(),
          payload: JSON.stringify(request.input('payload')),
        })
        return newSavedFilter
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          return 'ER_DUP_ENTRY'
        }
        console.log(error)
      }
    }
  }

  async getAllSavedFilters({ auth, request, response }) {
    if (auth.user) {
      let additional_info = false,
        additional_info_data = {},
        allFilters = []
      insurance_policy = true
      try {
        allFilters = await Database.table('saved_filters_schedule_games').where({ user_id: auth.user.id })
        for (var i = 0; i < allFilters.length; i++) {
          let payload = {
            game_name: false,
            value_one: false,
            value_two: false,
            value_three: false,
            value_four: false,
            value_five: false,
            region: false,
            experience: false,
            start_time: false,
            platform: false,
            description: false,
            tags: false,
          }
          let mysql_sort_fail = JSON.parse(allFilters[i].payload)
          for (var attributename in mysql_sort_fail) {
            payload[attributename] = mysql_sort_fail[attributename]
          }
          if (
            payload['value_one'] != false ||
            payload['value_two'] != false ||
            payload['value_three'] != false ||
            payload['value_four'] != false ||
            payload['value_five'] != false
          ) {
            const getGameFields = await Database.table('game_names')
              .innerJoin('game_name_fields', 'game_name_fields.game_names_id', 'game_names.id')
              .where('game_name', '=', payload['game_name'])
              .select('game_name_fields.*')
              .first()

            if (getGameFields != undefined) {
              let obj = '',
                obj2 = '',
                obj3 = '',
                obj4 = '',
                obj5 = ''

              insurance_policy = false

              if (getGameFields.in_game_fields != undefined) {
                obj = JSON.parse(getGameFields.in_game_fields)
              }
              if (getGameFields.in_game_field_placeholders != undefined) {
                obj2 = JSON.parse(getGameFields.in_game_field_placeholders)
              }
              if (getGameFields.in_game_field_types != undefined) {
                obj3 = JSON.parse(getGameFields.in_game_field_types)
              }
              if (getGameFields.in_game_field_labels != undefined) {
                obj4 = JSON.parse(getGameFields.in_game_field_labels)
              }
              if (getGameFields.in_game_field_values != undefined) {
                obj5 = JSON.parse(getGameFields.in_game_field_values)
              }

              for (let key in obj) {
                additional_info_data[obj[key]] = {
                  label: obj4[obj[key]],
                  type: obj3[obj[key]],
                  placeholder: obj2[obj[key]],
                  value: obj5[obj[key]],
                }
              }
            }

            if (JSON.stringify(additional_info_data) !== '{}') {
              additional_info = true
            }
          }

          allFilters[i].payload = JSON.stringify(payload)
        }
        return {
          allFilters,
          additional_info,
          additional_info_data,
        }
      } catch (error) {
        console.log(error)
        allFilters = []
        additional_info = false
        if (insurance_policy) {
          const byebyebye = await Database.table('saved_filters_schedule_games')
            .where({
              user_id: auth.user.id,
            })
            .delete()
        }

        return {
          allFilters,
          additional_info,
          additional_info_data,
        }
      }
    }
  }

  async updateFilter({ auth, request, response }) {
    if (/['/.%#$,;`\\]/.test(request.input('name'))) {
      return false
    }
    if (auth.user) {
      try {
        const updateFilter = await SavedFiltersScheduleGame.query()
          .where({ id: request.input('id') })
          .update({
            name: request.input('name'),
            payload: JSON.stringify(request.input('payload')),
          })
        return 'Saved successfully'
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          return 'ER_DUP_ENTRY'
        }
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const byebyebye = await Database.table('saved_filters_schedule_games')
          .where({
            id: request.input('id'),
          })
          .delete()

        return 'Deleted successfully'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = SavedFiltersScheduleGameController
