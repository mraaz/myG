import { forceObject, forceInt, forceStatus, forceString, forceBoolean } from './primitives'

export default class ProfileSchema {
  constructor(data) {
    this.set(data)
  }

  set(data) {
    if (!data) data = {}
    if (data.loading !== undefined) this.loading = forceBoolean(data.loading)
    if (data.error !== undefined) this.error = data.error.message ? forceString(data.error.message) : forceString(data.error)
    if (data.alias !== undefined) this.alias = forceString(data.alias)
    if (data.image !== undefined) this.image = forceString(data.image);
    if (data.background !== undefined) this.background = forceString(data.background);
    if (data.country !== undefined) this.country = forceString(data.country);
    if (data.relationship !== undefined) this.relationship = forceString(data.relationship);
    if (data.status !== undefined) this.status = forceStatus(data.status);
    if (data.level !== undefined) this.level = forceInt(data.level);
    if (data.experience !== undefined) this.experience = forceInt(data.experience);
    if (data.isSelf !== undefined) this.isSelf = forceBoolean(data.isSelf)
    if (data.isFriend !== undefined) this.isFriend = forceBoolean(data.isFriend)
    if (data.isFollower !== undefined) this.isFollower = forceBoolean(data.isFollower)
    if (data.hasSentFriendRequest !== undefined) this.hasSentFriendRequest = forceBoolean(data.hasSentFriendRequest);
    if (data.hasReceivedFriendRequest !== undefined) this.hasReceivedFriendRequest = forceBoolean(data.hasReceivedFriendRequest);
    if (data.gameExperiences !== undefined) this.gameExperiences = forceObject(data.gameExperiences);
    if (data.esportsExperiences !== undefined) this.esportsExperiences = forceObject(data.esportsExperiences);
    if (data.esportsBio !== undefined) this.esportsBio = forceObject(data.esportsBio);
  }
}
