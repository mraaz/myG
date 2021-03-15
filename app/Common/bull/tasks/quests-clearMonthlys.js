module.exports = async (job, done) => {
  const guardExecution = require('./execution-guard');
  await guardExecution(job.queue.name, job.data.delay);
  const AchievementsRepository = require('../../../Repositories/Achievements')
  AchievementsRepository.clearMonthlys(job).then(done);
}
