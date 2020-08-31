
const Database = use('Database');
const User = use('App/Models/User');
const Friend = use('App/Models/Friend');
const Follower = use('App/Models/Follower');
const UserLanguage = use('App/Models/UserLanguage');
const Notification = use('App/Models/Notification');
const EsportsBio = use('App/Models/EsportsBio');
const UserMostPlayedGame = use('App/Models/UserMostPlayedGame');
const GameNameController = use('App/Controllers/Http/GameNameController');

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
    const email = profile.email;
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
      mostPlayedGames,
      gameExperiences,
      esportsExperiences,
    ] = await Promise.all([
      this.isFriend({ isSelf, requestingUserId, profileId }),
      this.isFollower({ isSelf, requestingUserId, profileId }),
      this.hasSentFriendRequest({ isSelf, requestingUserId, profileId }),
      this.fetchFriendRequest({ isSelf, requestingUserId, profileId }),
      this.fetchLanguages({ profileId }),
      this.fetchMostPlayedGames({ profileId }),
      this.fetchGameExperiences({ profileId }),
      this.fetchEsportsExperiences({ profileId }),
    ]);
    const hasReceivedFriendRequest = !!friendRequest.id;
    const friendRequestId = friendRequest.id;
    const profileSchema = new ProfileSchema({
      profileId,
      alias: alias || profile.alias,
      firstName: (visibilityName === 'public' || visibilityName === 'friends' && isFriend || isSelf) ? firstName : '',
      lastName: (visibilityName === 'public' || visibilityName === 'friends' && isFriend || isSelf) ? lastName : '',
      email: (visibilityEmail === 'public' || visibilityEmail === 'friends' && isFriend || isSelf) ? email : '',
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
      mostPlayedGames,
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
    return response && (response.toJSON() || []).map(element => element.language);
  }

  async fetchMostPlayedGames({ profileId }) {
    const response = await Database.table('user_most_played_games')
    .innerJoin('game_names', 'game_names.id', 'user_most_played_games.game_name_id')
    .where('user_most_played_games.user_id', '=', profileId)
    .select('game_names.game_name');
    return response && response.map(element => element.game_name);
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
      await UserMostPlayedGame.query({ user_id: requestingUserId }).delete();
      const gameController = new GameNameController();
      const createGame = (gameName) => gameController.createGame({ auth: { user: { id: requestingUserId } } }, gameName)
      for (const gameName of mostPlayedGames.filter(gameName => !!gameName)) {
        const game = await Database.from('game_names').where({ game_name: gameName }).select('id' ,'game_name');
        const gameId = game && game[0] ? game[0].id : (await createGame(gameName)).id;
        const mostPlayedGame = new UserMostPlayedGame();
        mostPlayedGame.user_id = requestingUserId;
        mostPlayedGame.game_name_id = gameId;
        await mostPlayedGame.save();
      }
    }
    await User.query().where('id', requestingUserId).update(updates);
    return this.fetchProfileInfo({ requestingUserId, id: requestingUserId });
  }

}

module.exports = new ProfileRepository();
