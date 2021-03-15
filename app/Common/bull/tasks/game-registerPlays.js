module.exports = async (job, done) => {
  const guardExecution = require('./execution-guard');
  await guardExecution(job.queue.name, job.data.delay);
  const ScheduleGameController = require('../../../Controllers/Http/ScheduleGameController')
  new ScheduleGameController().registerPlays(job).then(done);
}
