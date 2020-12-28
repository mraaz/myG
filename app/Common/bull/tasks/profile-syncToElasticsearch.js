module.exports = (job, done) => {
  const ProfileRepository = require('../../../Repositories/Profile')
  ProfileRepository.syncToElasticsearch(job).then(done);
}
