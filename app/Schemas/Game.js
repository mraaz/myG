
const { forceInt, forceString } = require('./Primitives');

class Game {

  constructor(data) {
    this.gameId = forceInt(data.gameId);
    this.userId = forceInt(data.userId);
    this.name = forceString(data.name);
    this.icon = forceString(data.icon);
  }

}

module.exports = Game;