'use strict'
const LoggingRepository = require('../../Repositories/Logging')
const axios = use('axios')

const Env = use('Env')
const SLACK_BASE_URL = Env.get('SLACK_BASE_URL')

class SlackController {
  async sendMessage(text_to_send) {
    try {
      const data = text_to_send
      const payload = {
        username: 'myG_webApp',
        attachments: [{ text: data }]
      }
      const options = {
        method: 'post',
        baseURL: SLACK_BASE_URL,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: payload
      }
      await axios.request(options)
      return
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
        method: 'sendMessage'
      })
    }
  }
}

module.exports = SlackController
