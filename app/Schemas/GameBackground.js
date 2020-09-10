const { forceInt, forceString } = require('./Primitives')

class GameBackground {
  constructor(data) {
    this.id = forceInt(data.id)
    this.userId = forceInt(data.user_id)
    this.game = forceInt(data.game_names_id)
    this.experienceId = forceInt(data.experience_id)
    this.team = forceString(data.team)
    this.role = forceString(data.role)
    this.experience = forceString(data.experience)
    this.skills = data.skills ? data.skills.split('|') : []
  }
}

module.exports = GameBackground
