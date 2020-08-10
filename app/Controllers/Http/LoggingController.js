const LoggingRepository = require('../../Repositories/Logging')

class LoggingController {
  async log({ request, response }) {
    const { environment, type, source, context, message } = request.only(['environment', 'type', 'source', 'context', 'message'])
    const { success, error } = await LoggingRepository.log({ environment, type, source, context, message })
    response.send({ success, error })
  }
}

module.exports = LoggingController
