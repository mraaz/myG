module.exports = async (job, done) => {
  const guardExecution = require('./execution-guard');
  await guardExecution(job.queue.name, job.data.delay);
  const AwsKeyController = require('../../../Controllers/Http/AwsKeyController')
  new AwsKeyController().deleteFilesFromS3(job).then(done);
}
