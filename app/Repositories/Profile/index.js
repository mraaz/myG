
const Database = use('Database');
const User = use('App/Models/User');
const Friend = use('App/Models/Friend');
const Follower = use('App/Models/Follower');
const UserLanguage = use('App/Models/UserLanguage');
const Notification = use ('App/Models/Notification');
const EsportsBio = use ('App/Models/EsportsBio');

const ProfileSchema = require('../../Schemas/Profile');

class ProfileRepository {

  async fetchProfileId({ alias }) {
    const profile = await this.fetchProfileByAlias({ alias });
    return profile.id;
  }

  async fetchProfileInfo({ requestingUserId, id, alias }) {
    const profile = id ? await this.fetchProfileById({ id }) : await this.fetchProfileByAlias({ alias });
    const profileId = profile.id;
    const firstName = profile.first_name;
    const lastName = profile.last_name;
    const image = profile.profile_img;
    const background = profile.profile_bg;
    const team = profile.team;
    const country = profile.country;
    const relationship = profile.relationship_status;
    const status = profile.status;
    const level = profile.level;
    const visibilityName = profile.name_visibility;
    const visibilityEmail = profile.email_visibility;
    const lookingForWork = profile.looking_for_work;
    const experience = profile.experience_points;
    const isSelf = requestingUserId === profileId;
    const [
      isFriend,
      isFollower,
      hasSentFriendRequest,
      friendRequest,
      languages,
      gameExperiences,
      esportsExperiences,
    ] = await Promise.all([
      this.isFriend({ isSelf, requestingUserId, profileId }),
      this.isFollower({ isSelf, requestingUserId, profileId }),
      this.hasSentFriendRequest({ isSelf, requestingUserId, profileId }),
      this.fetchFriendRequest({ isSelf, requestingUserId, profileId }),
      this.fetchLanguages({ profileId }),
      this.fetchGameExperiences({ profileId }),
      this.fetchEsportsExperiences({ profileId }),
    ]);
    const hasReceivedFriendRequest = !!friendRequest.id;
    const friendRequestId = friendRequest.id;
    const profileSchema = new ProfileSchema({
      profileId,
      alias: alias || profile.alias,
      firstName,
      lastName,
      image,
      background,
      languages,
      team,
      country,
      relationship,
      status,
      level,
      experience,
      visibilityName,
      visibilityEmail,
      lookingForWork,
      isSelf,
      isFriend,
      isFollower,
      hasSentFriendRequest,
      hasReceivedFriendRequest,
      friendRequestId,
      gameExperiences,
      esportsExperiences,
    });
    return {
      profile: profileSchema,
    }
  }

  async fetchProfileById({ id }) {
    const response = await User.query().where('id', id).fetch();
    const profile = response && response.toJSON()[0];
    if (!profile) throw new Error("PROFILE_NOT_FOUND");
    return profile;
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

  async fetchFriendRequest({ isSelf, requestingUserId, profileId }) {
    if (isSelf) return false;
    const response = await Notification.query().where('user_id', profileId).andWhere('other_user_id', requestingUserId).andWhere('activity_type', 1).fetch();
    return response && response.toJSON()[0] || false;
  }

  async fetchLanguages({ profileId }) {
    const response = await UserLanguage.query().where('user_id', profileId).fetch();
    return response && (response.toJSON() || []).map(element => element.language)
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

  async updateProfile({ requestingUserId, firstName, lastName, team, country, relationship, visibilityName, visibilityEmail, lookingForWork, languages, mostPlayedGames }) {
    const updates = {};
    if (firstName !== undefined) updates.first_name = firstName;
    if (lastName !== undefined) updates.last_name = lastName;
    if (team !== undefined) updates.team = team;
    if (country !== undefined) updates.country = country;
    if (relationship !== undefined) updates.relationship_status = relationship;
    if (visibilityName !== undefined) updates.name_visibility = visibilityName;
    if (visibilityEmail !== undefined) updates.email_visibility = visibilityEmail;
    if (lookingForWork !== undefined) updates.looking_for_work = lookingForWork;
    if (languages !== undefined) {
      await UserLanguage.query().where('user_id', requestingUserId).delete();
      const languagesRequests = languages.map(language => {
        const userLanguage = new UserLanguage();
        userLanguage.user_id = requestingUserId;
        userLanguage.language = language;
        return userLanguage.save();
      });
      await Promise.all(languagesRequests);
    }
    if (mostPlayedGames !== undefined) {

    }
    await User.query().where('id', requestingUserId).update(updates);
    return this.fetchProfileInfo({ requestingUserId, id: requestingUserId });
  }

}

module.exports = new ProfileRepository();
