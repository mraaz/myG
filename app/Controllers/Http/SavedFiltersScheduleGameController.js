'use strict'
const Database = use('Database')
const SavedFiltersScheduleGame = use('App/Models/SavedFiltersScheduleGame')

class SavedFiltersScheduleGameController {
  async store({ auth, request, response }) {
    if (auth.user) {
      if (/['/.%#$,;`\\]/.test(request.input('content'))) {
        return false
      }
      try {
        const newSavedFilter = await SavedFiltersScheduleGame.create({
          user_id: auth.user.id,
          name: request.input('name').trim(),
          payload: JSON.stringify(request.input('payload')),
        })
        return 'Saved'
      } catch (error) {
        console.log(error)
      }
    }
  }

  async getAllSavedFilters({ auth, request, response }) {
    if (auth.user) {
      try {
        const allFilters = await Database.table('saved_filters_schedule_games').where({ user_id: auth.user.id })

        return {
          allFilters,
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  async updateFilter({ auth, request, response }) {
    if (auth.user) {
      try {
        const updateFilter = await SavedFiltersScheduleGame.query()
          .where({ user_id: auth.user.id, name: request.input('name') })
          .update({
            payload: JSON.stringify(request.input('payload')),
          })
        return 'Saved successfully'
      } catch (error) {
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
            user_id: auth.user.id,
            name: request.input('name'),
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
