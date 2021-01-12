module.exports = (job, done) => {
  const AwsKeyController = require('../../../Controllers/Http/AwsKeyController')
  new AwsKeyController().deleteFilesFromS3(job).then(done);
}
