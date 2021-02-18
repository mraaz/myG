module.exports = (job, done) => {
  const ScheduleGameController = require('../../../Controllers/Http/ScheduleGameController')
  new ScheduleGameController().registerPlays(job).then(done);
}
