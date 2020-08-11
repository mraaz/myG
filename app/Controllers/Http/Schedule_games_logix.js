'use strict'

class Schedule_games_logix {
  async getGameHeaders(game_name) {
    let header_struct = {
      experience: true,
      platform: true,
      region: true,
    }

    switch (game_name) {
      case 'Dota 2':
        header_struct = {
          experience: true,
          platform: false,
          region: false,
        }
        break
      default:
    }
    return header_struct
  }
}

module.exports = Schedule_games_logix
