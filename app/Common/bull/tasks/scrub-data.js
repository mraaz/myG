module.exports = async (job, done) => {
  const guardExecution = require('./execution-guard')
  await guardExecution(job.queue.name, job.data.delay)
  const UserController = require('../../../Controllers/Http/UserController')
  //new UserController().scrub_data(job).then(done)
}
