module.exports = (job, done) => {
  const UserController = require('../../../Controllers/Http/UserController')
  new UserController().update_has_additional(job).then(done)
}
