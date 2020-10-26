const GameExperience = require('./GameExperience');
const { forceInt, forceString, forceArray, forceStatus, forceBoolean } = require('./Primitives')

class Profile {
  constructor(data) {
    this.profileId = forceString(data.profileId)
    this.alias = forceString(data.alias)
    this.firstName = forceString(data.firstName)
    this.lastName = forceString(data.lastName)
    this.email = forceString(data.email)
    this.image = forceString(data.image)
    this.background = forceString(data.background)
    this.languages = forceArray(data.languages)
    this.mostPlayedGames = forceArray(data.mostPlayedGames)
    this.team = forceString(data.team)
    this.country = forceString(data.country)
    this.twitch = forceString(data.twitch)
    this.discord = forceString(data.discord)
    this.steam = forceString(data.steam)
    this.youtube = forceString(data.youtube)
    this.facebook = forceString(data.facebook)
    this.relationship = forceString(data.relationship)
    this.status = forceStatus(data.status)
    this.level = forceInt(data.level)
    this.experience = forceInt(data.experience)
    this.visibilityName = forceString(data.visibilityName)
    this.visibilityEmail = forceString(data.visibilityEmail)
    this.lookingForWork = forceBoolean(data.lookingForWork)
    this.isSelf = forceBoolean(data.isSelf)
    this.isFriend = forceBoolean(data.isFriend)
    this.isFollower = forceBoolean(data.isFollower)
    this.friends = forceArray(data.friends)
    this.followers = forceArray(data.followers)
    this.hasSentFriendRequest = forceBoolean(data.hasSentFriendRequest)
    this.hasReceivedFriendRequest = forceBoolean(data.hasReceivedFriendRequest)
    this.friendRequestId = forceInt(data.friendRequestId)
    this.gameExperiences = forceArray(data.gameExperiences).map(experience => new GameExperience(experience));
    this.commendations = forceArray(data.commendations)
    this.commended = forceArray(data.commended)
    this.commender = forceArray(data.commender)
  }
}

module.exports = Profile
