module.exports = async (job, done) => {
  const guardExecution = require('./execution-guard');
  await guardExecution(job.queue.name, job.data.delay);
  const PostController = require('../../../Controllers/Http/PostController')
  new PostController().shuffle_sponsored_posts(job).then(done)
}
