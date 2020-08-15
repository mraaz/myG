
const Database = use('Database');
const User = use('App/Models/User');
const Friend = use('App/Models/Friend');
const Follower = use('App/Models/Follower');
const Notification = use ('App/Models/Notification');
const EsportsBio = use ('App/Models/EsportsBio');

const ProfileSchema = require('../../Schemas/Profile');

class ProfileRepository {

  async fetchProfileInfo({ requestingUserId, alias }) {
    const profile = await this.fetchProfileByAlias({ alias });
    const profileId = profile.id;
    const image = profile.profile_img;
    const background = profile.profile_background;
    const country = profile.country;
    const relationship = profile.relationship_status;
    const status = profile.status;
    const level = profile.level;
    const experience = profile.experience_points;
    const isSelf = requestingUserId === profileId;
    const [
      isFriend,
      isFollower,
      hasSentFriendRequest,
      hasReceivedFriendRequest,
      gameExperiences,
      esportsExperiences,
      esportsBio,
    ] = await Promise.all([
      this.isFriend({ isSelf, requestingUserId, profileId }),
      this.isFollower({ isSelf, requestingUserId, profileId }),
      this.hasSentFriendRequest({ isSelf, requestingUserId, profileId }),
      this.hasReceivedFriendRequest({ isSelf, requestingUserId, profileId }),
      this.fetchGameExperiences({ profileId }),
      this.fetchEsportsExperiences({ profileId }),
      this.fetchEsportsBio({ profileId }),
    ]);
    const profileSchema = new ProfileSchema({
      alias,
      image,
      background,
      country,
      relationship,
      status,
      level,
      experience,
      isSelf,
      isFriend,
      isFollower,
      hasSentFriendRequest,
      hasReceivedFriendRequest,
      gameExperiences,
      esportsExperiences,
      esportsBio,
    });
    return {
      profile: profileSchema,
    }
  }

  async fetchProfileByAlias({ alias }) {
    const response = await User.query().where('alias', alias).fetch();
    const profile = response && response.toJSON()[0];
    if (!profile) throw new Error("PROFILE_NOT_FOUND");
    return profile;
  }

  async isFriend({ isSelf, requestingUserId, profileId }) {
    if (isSelf) return false;
    const response = await Friend.query().where('user_id', requestingUserId).andWhere('friend_id', profileId).fetch();
    return response && response.toJSON()[0] || false;
  }

  async isFollower({ isSelf, requestingUserId, profileId }) {
    if (isSelf) return false;
    const response = await Follower.query().where('user_id', requestingUserId).andWhere('follower_id', profileId).fetch();
    return response && response.toJSON()[0] || false;
  }

  async hasSentFriendRequest({ isSelf, requestingUserId, profileId }) {
    if (isSelf) return false;
    const response = await Notification.query().where('user_id', requestingUserId).andWhere('other_user_id', profileId).andWhere('activity_type', 1).fetch();
    return response && response.toJSON()[0] || false;
  }

  async hasReceivedFriendRequest({ isSelf, requestingUserId, profileId }) {
    if (isSelf) return false;
    const response = await Notification.query().where('user_id', profileId).andWhere('other_user_id', requestingUserId).andWhere('activity_type', 1).fetch();
    return response && response.toJSON()[0] || false;
  }

  async fetchGameExperiences({ profileId }) {
    const response = await Database.table('game_experiences')
      .innerJoin('game_names', 'game_names.id', 'game_experiences.game_names_id')
      .where('game_experiences.user_id', '=', profileId)
      .select('game_experiences.*', 'game_names.game_name');
    const gameExperiences = response && response[0];
    return gameExperiences || {};
  }

  async fetchEsportsExperiences({ profileId }) {
    const response = await Database.table('esports_experiences')
      .innerJoin('game_names', 'game_names.id', 'esports_experiences.game_names_id')
      .where('esports_experiences.id', '=', profileId)
      .select('esports_experiences.*', 'game_names.game_name');
    const esportsExperiences = response && response[0];
    return esportsExperiences || {};
  }

  async fetchEsportsBio({ profileId }) {
    const response = await EsportsBio.query().where('user_id', '=', profileId).fetch();
    const bio = response && response.toJSON()[0];
    return bio || {};
  }

}

module.exports = new ProfileRepository();
