
const GameName = use('App/Models/GameName');
const GameSchema = require('../../Schemas/Game');

class GameRepository {

  async searchGames({ requestedName }) {
    const results = await GameName.query().where('game_name', 'like', `%${requestedName}%`).limit(10).fetch();
    if (!results) return { games: [] };
    const games = results.toJSON().map(game => new GameSchema({
      gameId: game.id,
      userId: game.user_id,
      name: game.game_name,
      icon: game.game_img,
    }));
    return { games };
  }

}

module.exports = new GameRepository();