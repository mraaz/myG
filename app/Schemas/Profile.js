const { forceObject, forceInt, forceString, forceStatus, forceBoolean } = require('./Primitives')

class Profile {
  constructor(data) {
    this.alias = forceString(data.alias)
    this.image = forceString(data.image);
    this.background = forceString(data.background);
    this.country = forceString(data.country);
    this.relationship = forceString(data.relationship);
    this.status = forceStatus(data.status);
    this.level = forceInt(data.level);
    this.experience = forceInt(data.experience);
    this.isSelf = forceBoolean(data.isSelf);
    this.isFriend = forceBoolean(data.isFriend);
    this.isFollower = forceBoolean(data.isFollower);
    this.hasSentFriendRequest = forceBoolean(data.hasSentFriendRequest);
    this.hasReceivedFriendRequest = forceBoolean(data.hasReceivedFriendRequest);
    this.gameExperiences = forceObject(data.gameExperiences);
    this.esportsExperiences = forceObject(data.esportsExperiences);
    this.esportsBio = forceObject(data.esportsBio);
  }
}

module.exports = Profile
