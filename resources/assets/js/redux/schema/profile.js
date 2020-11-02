import { forceInt, forceStatus, forceArray, forceString, forceBoolean } from './primitives'

export default class ProfileSchema {
  constructor(data) {
    this.set(data)
  }

  set(data) {
    if (!data) data = {}
    if (data.loading !== undefined) this.loading = forceBoolean(data.loading)
    if (data.error !== undefined) this.error = data.error.message ? forceString(data.error.message) : forceString(data.error)
    if (data.profileId !== undefined) this.profileId = forceString(data.profileId)
    if (data.alias !== undefined) this.alias = forceString(data.alias)
    if (data.firstName !== undefined) this.firstName = forceString(data.firstName)
    if (data.lastName !== undefined) this.lastName = forceString(data.lastName)
    if (data.email !== undefined) this.email = forceString(data.email)
    if (data.image !== undefined) this.image = forceString(data.image)
    if (data.background !== undefined) this.background = forceString(data.background)
    if (data.languages !== undefined) this.languages = forceArray(data.languages)
    if (data.mostPlayedGames !== undefined) this.mostPlayedGames = forceArray(data.mostPlayedGames)
    if (data.team !== undefined) this.team = forceString(data.team)
    if (data.country !== undefined) this.country = forceString(data.country)
    if (data.twitch !== undefined) this.twitch = forceString(data.twitch)
    if (data.discord !== undefined) this.discord = forceString(data.discord)
    if (data.steam !== undefined) this.steam = forceString(data.steam)
    if (data.youtube !== undefined) this.youtube = forceString(data.youtube)
    if (data.facebook !== undefined) this.facebook = forceString(data.facebook)
    if (data.relationship !== undefined) this.relationship = forceString(data.relationship)
    if (data.status !== undefined) this.status = forceStatus(data.status)
    if (data.level !== undefined) this.level = forceInt(data.level)
    if (data.experience !== undefined) this.experience = forceInt(data.experience)
    if (data.visibilityName !== undefined) this.visibilityName = forceString(data.visibilityName)
    if (data.visibilityEmail !== undefined) this.visibilityEmail = forceString(data.visibilityEmail)
    if (data.lookingForWork !== undefined) this.lookingForWork = forceBoolean(data.lookingForWork)
    if (data.isSelf !== undefined) this.isSelf = forceBoolean(data.isSelf)
    if (data.isFriend !== undefined) this.isFriend = forceBoolean(data.isFriend)
    if (data.isFollower !== undefined) this.isFollower = forceBoolean(data.isFollower)
    if (data.friends !== undefined) this.friends = forceArray(data.friends)
    if (data.followers !== undefined) this.followers = forceArray(data.followers)
    if (data.friendRequests !== undefined) this.friendRequests = forceArray(data.friendRequests)
    if (data.hasSentFriendRequest !== undefined) this.hasSentFriendRequest = forceBoolean(data.hasSentFriendRequest)
    if (data.hasReceivedFriendRequest !== undefined) this.hasReceivedFriendRequest = forceBoolean(data.hasReceivedFriendRequest)
    if (data.friendRequestId !== undefined) this.friendRequestId = forceInt(data.friendRequestId)
    if (data.gameExperiences !== undefined) this.gameExperiences = forceArray(data.gameExperiences)
    if (data.esportsExperiences !== undefined) this.esportsExperiences = forceArray(data.esportsExperiences)
    if (data.commended !== undefined) this.commended = forceArray(data.commended)
    if (data.commender !== undefined) this.commender = forceArray(data.commender)
  }

  addFollower(alias) {
    this.followers = forceArray(this.followers)
    this.followers.push(alias)
  }

  addFriendRequest(alias) {
    this.friendRequests = forceArray(this.friendRequests)
    this.friendRequests.push(alias)
  }

  removeFollower(alias) {
    this.followers = forceArray(this.followers)
    this.followers.filter((follower) => follower !== alias)
  }

  removeFriendRequest(alias) {
    this.friendRequests = forceArray(this.friendRequests)
    this.friendRequests.filter((request) => request !== alias)
  }
}
