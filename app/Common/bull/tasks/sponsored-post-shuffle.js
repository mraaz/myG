module.exports = (job, done) => {
  const PostController = require('../../../Controllers/Http/PostController')
  new PostController().shuffle_sponsored_posts(job).then(done)
}
