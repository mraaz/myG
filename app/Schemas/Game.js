
const { forceInt, forceString, forceBoolean } = require('./Primitives');

class Game {

  constructor(data) {
    this.gameId = forceInt(data.gameId);
    this.userId = forceInt(data.userId);
    this.name = forceString(data.name);
    this.icon = forceString(data.icon);
    this.isFavorite = forceBoolean(data.isFavorite);
  }

}

module.exports = Game;