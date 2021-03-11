module.exports = (job, done) => {
  const SeatsAvailableController = require('../../../Controllers/Http/SeatsAvailableController')
  new SeatsAvailableController().delete_expired_codes(job).then(done)
}
