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
      case 'League of Legends':
        header_struct = {
          experience: true,
          platform: false,
          region: false,
        }
        break
      case 'Mobile Legends: Bang Bang':
        header_struct = {
          experience: true,
          platform: false,
          region: true,
        }
        break
      case 'Overwatch':
        header_struct = {
          experience: true,
          platform: true,
          region: false,
        }
        break
      case 'Call of Duty: Warzone':
        header_struct = {
          experience: true,
          platform: true,
          region: false,
        }
        break
      case 'CSGO':
        header_struct = {
          experience: true,
          platform: true,
          region: false,
        }
        break
      case 'Fortnite':
        header_struct = {
          experience: true,
          platform: true,
          region: false,
        }
        break
      case 'PUBG':
        header_struct = {
          experience: true,
          platform: false,
          region: false,
        }
        break
      case 'Rocket League':
        header_struct = {
          experience: true,
          platform: true,
          region: false,
        }
        break
    }
    return header_struct
  }
}

module.exports = Schedule_games_logix
