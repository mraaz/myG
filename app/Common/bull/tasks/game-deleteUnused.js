module.exports = (job, done) => {
  const GameNameController = require('../../../Controllers/Http/GameNameController')
  new GameNameController().deleteUnusedGames(job).then(done);
}
