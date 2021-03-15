module.exports = async (job, done) => {
  const guardExecution = require('./execution-guard');
  await guardExecution(job.queue.name, job.data.delay);
  const SeatsAvailableController = require('../../../Controllers/Http/SeatsAvailableController')
  new SeatsAvailableController().delete_expired_codes(job).then(done)
}
