const { forceInt, forceString, forceJson } = require('./Primitives')

class GameExperience {
  constructor(data) {
    this.id = forceInt(data.id)
    this.userId = forceInt(data.user_id)
    this.game = forceInt(data.game_names_id)
    this.gameName = forceString(data.game_name || data.gameName)
    this.gameImage = forceString(data.game_img || data.gameImage)
    this.mainFields = data.main_fields ? data.main_fields.split('|') : [];
    this.level = forceString(data.level)
    this.experience = forceString(data.experience)
    this.team = forceString(data.team)
    this.nickname = forceString(data.nickname)
    this.tags = data.tags ? data.tags.split('|') : [];
    this.dynamic = forceJson(data.dynamic)
    this.background = data.background || []
  }
}

module.exports = GameExperience
