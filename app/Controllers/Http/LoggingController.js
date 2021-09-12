const LoggingRepository = require('../../Repositories/Logging')

class LoggingController {
  async log({ request, response }) {
    const { environment, type, source, context, browser, system, message } = request.only([
      'environment',
      'type',
      'source',
      'context',
      'browser',
      'system',
      'message'
    ])
    const { success, error } = await LoggingRepository.log({ environment, type, source, context, browser, system, message })
    response.send({ success, error })
  }
}

module.exports = LoggingController
