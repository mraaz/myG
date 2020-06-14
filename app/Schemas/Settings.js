const { forceBoolean } = require('./Primitives')

class Settings {
  constructor(data) {
    this.emailNotificationsEnabled = forceBoolean(data.emailNotificationsEnabled || data.email_notification)
    this.pushNotificationsEnabled = forceBoolean(data.pushNotificationsEnabled || data.push_notification)
  }
}

module.exports = Settings
