module.exports = (job, done) => {
  const ScheduleGameController = require('../../../Controllers/Http/ScheduleGameController')
  new ScheduleGameController().syncToElasticsearch(job).then(done);
}
