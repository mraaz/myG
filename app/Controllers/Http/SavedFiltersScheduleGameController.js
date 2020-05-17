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
          payload: 'Test',
        })
        return newGameTag.id
      } catch (error) {
        console.log(error)
      }
    }
  }
}

module.exports = SavedFiltersScheduleGameController
