
const Database = use('Database');
const User = use('App/Models/User');
const Friend = use('App/Models/Friend');
const Follower = use('App/Models/Follower');
const UserLanguage = use('App/Models/UserLanguage');
const Notification = use('App/Models/Notification');
const GameExperience = use('App/Models/GameExperience');
const GameBackground = use('App/Models/GameBackground');
const GameName = use('App/Models/GameName');
const UserMostPlayedGame = use('App/Models/UserMostPlayedGame');
const GameNameController = use('App/Controllers/Http/GameNameController');
const AwsKeyController = use('App/Controllers/Http/AwsKeyController');
const ConnectionController = use('App/Controllers/Http/ConnectionController');

const ProfileSchema = require('../../Schemas/Profile');
const GameExperienceSchema = require('../../Schemas/GameExperience');
const GameBackgroundSchema = require('../../Schemas/GameBackground');

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
      gameBackground,
    ] = await Promise.all([
      this.isFriend({ isSelf, requestingUserId, profileId }),
      this.isFollower({ isSelf, requestingUserId, profileId }),
      this.hasSentFriendRequest({ isSelf, requestingUserId, profileId }),
      this.fetchFriendRequest({ isSelf, requestingUserId, profileId }),
      this.fetchLanguages({ profileId }),
      this.fetchMostPlayedGames({ profileId }),
      this.fetchGameExperiences({ profileId }),
      this.fetchGameBackground({ profileId }),
      this.fetchGameBackground({ profileId }),
    ]);
    const hasReceivedFriendRequest = !!friendRequest.id;
    const friendRequestId = friendRequest.id;
    this.insertBackgroundIntoExperiences({ gameExperiences, gameBackground });
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
      .select('game_experiences.*', 'game_names.game_name', 'game_names.game_img');
    return response || [];
  }

  async fetchGameBackground({ profileId }) {
    const response = await GameBackground.query().where('user_id', profileId).fetch();
    return response ? (response.toJSON() || []).map(background => new GameBackgroundSchema(background)) : [];
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
      await UserMostPlayedGame.query().where('user_id', requestingUserId).delete();
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

  async updateGame({ requestingUserId, id, imageKey, imageSource, mainFields, game, gameName, nickname, level, experience, team, tags, background }) {
    if (!game && gameName) {
      const gameNameModel = new GameName();
      gameNameModel.user_id = requestingUserId;
      gameNameModel.game_name = gameName;
      gameNameModel.game_img = imageSource;
      await gameNameModel.save();
      game = gameNameModel.id;
      if (imageKey) {
        const keyController = new AwsKeyController();
        const auth = { user: { id: requestingUserId } };
        const request = { gameId: game, awsKey: imageKey };
        await keyController.addGameIconKey({ auth, request });
      }
    }
    
    const gameExperience = id ? await GameExperience.find(id) : new GameExperience();
    gameExperience.user_id = requestingUserId;
    gameExperience.game_names_id = game;
    gameExperience.main_fields = mainFields;
    gameExperience.level = level;
    gameExperience.experience = experience;
    gameExperience.team = team;
    gameExperience.nickname = nickname;
    gameExperience.tags = tags;
    await gameExperience.save();

    await GameBackground.query().where('experience_id', gameExperience.id).delete();
    await Promise.all(background.map(experience => {
      const gameBackground = new GameBackground();
      gameBackground.user_id = requestingUserId;
      gameBackground.game_names_id = game;
      gameBackground.experience_id = gameExperience.id;
      gameBackground.team = experience.team;
      gameBackground.role = experience.role;
      gameBackground.experience = experience.experience;
      gameBackground.skills = experience.skills;
      return gameBackground.save();
    }))

    const gameExperiences = await this.fetchGameExperiences({ profileId: requestingUserId });
    const gameBackground = await this.fetchGameBackground({ profileId: requestingUserId });
    this.insertBackgroundIntoExperiences({ gameExperiences, gameBackground })
    return { gameExperiences: gameExperiences.map(experience => new GameExperienceSchema(experience)) }
  }

  insertBackgroundIntoExperiences({ gameExperiences, gameBackground }) {
    const backgroundByExperience = {};
    gameBackground.forEach((background) => {
      if (!backgroundByExperience[background.experienceId]) backgroundByExperience[background.experienceId] = [];
      backgroundByExperience[background.experienceId].push(background);
    });
    gameExperiences.forEach((experience) => experience.background = backgroundByExperience[experience.id] || []);
  }

  async fetchGamerSuggestions({ requestingUserId }) {
    const auth = { user: { id: requestingUserId} };
    const request = { input: () => 1 };
    const connectionController = new ConnectionController();
    const { data } = await connectionController.gamers_you_might_know({ auth, request });
    const gamerSuggestions = await Promise.all(data.map(({ alias }) => this.fetchProfileInfo({ requestingUserId, alias })));
    return { gamerSuggestions: gamerSuggestions.map(suggestion => suggestion.profile) };
  }

}

module.exports = new ProfileRepository();
