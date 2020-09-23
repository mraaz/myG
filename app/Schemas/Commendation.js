const { forceInt, forceDate } = require('./Primitives')

class Commendation {
  constructor(data) {
    this.id = forceInt(data.id)
    this.gameExperienceId = forceInt(data.game_experiences_id)
    this.commendedId = forceInt(data.user_id)
    this.commenderId = forceInt(data.commender_id)
    this.createdAt = forceDate(data.createdAt)
    this.updatedAt = forceDate(data.updatedAt)
  }
}

module.exports = Commendation
