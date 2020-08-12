const { forceInt, forceString, forceBoolean } = require('./Primitives')

class Profile {
  constructor(data) {
    this.alias = forceString(data.alias)
    this.isSelf = forceBoolean(data.isSelf);
    this.isFriend = forceBoolean(data.isFriend);
    this.isFollower = forceBoolean(data.isFollower);
  }
}

module.exports = Profile
