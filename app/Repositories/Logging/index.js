const elasticsearch = use('elasticsearch');

class LoggingRepository {
  async log({ environment, type, source, context, message, error }) {
    if (error) error = '';
    if (error) {
      const err = getErrorObject();
      const caller_line = err.stack.split("\n")[4];
      const index = caller_line.indexOf("at ");
      error = caller_line.slice(index + 2, caller_line.length);
    }
    return new elasticsearch.Client({
      host: process.env.ELASTICSEARCH,
      log: 'trace',
      apiVersion: '7.7',
    }).index({
      index: 'log',
      type: '_doc',
      body: {
        environment,
        type,
        source,
        context,
        message,
        error,
        date: Date.now(),
      }
    }).then(() => ({ success: true, error: null })).catch(error => ({ success: false, error }));
  }
}

module.exports = new LoggingRepository();