module.exports = (job, done) => {
  const AchievementsRepository = require('../../../Repositories/Achievements')
  AchievementsRepository.clearDailys(job).then(done);
}
