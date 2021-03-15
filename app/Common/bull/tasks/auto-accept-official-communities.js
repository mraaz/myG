module.exports = async (job, done) => {
  const guardExecution = require('./execution-guard')
  await guardExecution(job.queue.name, job.data.delay)
  const UsergroupController = require('../../../Controllers/Http/UsergroupController')
  new UsergroupController().autoApproveOfficialCommunities(job).then(done)
}
