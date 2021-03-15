module.exports = async (job, done) => {
  const guardExecution = require('./execution-guard');
  await guardExecution(job.queue.name, job.data.delay);
  const GameNameController = require('../../../Controllers/Http/GameNameController')
  new GameNameController().deleteUnusedGames(job).then(done);
}
