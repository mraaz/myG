module.exports = (job, done) => {
  const AchievementsRepository = require('../../../Repositories/Achievements')
  AchievementsRepository.clearMonthlys(job).then(done);
}
