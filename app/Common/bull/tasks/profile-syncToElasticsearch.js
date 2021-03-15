module.exports = async (job, done) => {
  const guardExecution = require('./execution-guard');
  await guardExecution(job.queue.name, job.data.delay);
  const ProfileRepository = require('../../../Repositories/Profile')
  ProfileRepository.syncToElasticsearch(job).then(done);
}
