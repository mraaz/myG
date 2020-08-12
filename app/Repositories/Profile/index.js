
const User = use('App/Models/User');
const Friend = use('App/Models/Friend');
const Follower = use('App/Models/Follower');

const ProfileSchema = require('../../Schemas/Profile');

class ProfileRepository {

  async fetchProfileInfo({ requestingUserId, alias }) {
    const profile = await this.fetchProfileByAlias({ alias });
    const isSelf = requestingUserId === profile.id;
    const [isFriend, isFollower] = await Promise.all([
      this.isFriend({ isSelf, requestingUserId, friendId: profile.id }),
      this.isFollower({ isSelf, requestingUserId, followerId: profile.id }),
    ]);
    return new ProfileSchema({
      alias,
      isSelf,
      isFriend,
      isFollower,
    })
  }

  async fetchProfileByAlias({ alias }) {
    const profile = await User.query().where('alias', alias).fetch();
    if (!profile) throw new Error("PROFILE_NOT_FOUND");
    return profile.toJSON();
  }

  async isFriend({ isSelf, requestingUserId, friendId }) {
    if (isSelf) return false;
    return Friend.query().where('user_id', requestingUserId).andWhere('friend_id', friendId);
  }

  async isFollower({ isSelf, requestingUserId, followerId }) {
    if (isSelf) return false;
    return Follower.query().where('user_id', requestingUserId).andWhere('follower_id', followerId);
  }

}

module.exports = new ProfileRepository();
