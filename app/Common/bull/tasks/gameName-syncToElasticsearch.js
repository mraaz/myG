module.exports = (job, done) => {
  const GameNameController = require('../../../Controllers/Http/GameNameController')
  new GameNameController().syncToElasticsearch(job).then(done);
}
