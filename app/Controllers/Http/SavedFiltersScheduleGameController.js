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
          content: request.input('content').trim(),
          user_id: auth.user.id,
        })
        return newGameTag.id
      } catch (error) {
        console.log(error)
      }
    }
  }
}

module.exports = SavedFiltersScheduleGameController
