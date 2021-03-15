module.exports = (job, done) => {
  const UsergroupController = require('../../../Controllers/Http/UsergroupController')
  new UsergroupController().autoApproveOfficialCommunities(job).then(done)
}
