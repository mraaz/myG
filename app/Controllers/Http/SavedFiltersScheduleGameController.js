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
      try {
        const allFilters = await Database.table('saved_filters_schedule_games').where({ user_id: auth.user.id })
        for (var i = 0; i < allFilters.length; i++) {
          let payload = {
            game_name: false,
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

          allFilters[i].payload = JSON.stringify(payload)
        }
        return {
          allFilters,
        }
      } catch (error) {
        console.log(error)
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
