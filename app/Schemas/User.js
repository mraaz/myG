const { forceInt, forceString } = require('./Primitives')

class User {
  constructor(data) {
    this.userId = forceInt(data.userId)
    this.alias = forceString(data.alias)
  }
}

module.exports = User
