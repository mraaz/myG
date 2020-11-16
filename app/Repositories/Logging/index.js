const elasticsearch = use('elasticsearch');

class LoggingRepository {
  async log({ environment, type, source, context, browser, system, message, error }) {
    if (!error) error = '';
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
        browser,
        system,
        message,
        error,
        date: Date.now(),
      }
    }).then(() => ({ success: true, error: null })).catch(error => ({ success: false, error }));
  }
}

module.exports = new LoggingRepository();