module.exports = (job, done) => {
  const AchievementsRepository = require('../../../Repositories/Achievements')
  AchievementsRepository.clearWeeklys(job).then(done);
}
