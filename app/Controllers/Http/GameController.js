'use strict'

const { log } = require('../../Common/logger')
const GameRepository = require('../../Repositories/Game')

class GameController {
  async searchGames({ auth, request, response }) {
    const requestingUserId = auth.user.id
    if (!requestingUserId) throw new Error('Auth Error')
    const requestedName = request.only('name').name
    log('GAME', `User ${requestingUserId} searching Games with ${requestedName}`)
    const { games } = await GameRepository.searchGames({ requestedName })
    return response.send({ games })
  }
}

module.exports = GameController
