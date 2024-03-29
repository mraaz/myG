const Database = use('Database');
const User = use('App/Models/User');
const Friend = use('App/Models/Friend');
const Follower = use('App/Models/Follower');
const UserLanguage = use('App/Models/UserLanguage');
const Notification = use('App/Models/Notification');
const GameExperience = use('App/Models/GameExperience');
const GameBackground = use('App/Models/GameBackground');
const GameName = use('App/Models/GameName');
const Commendation = use('App/Models/Commendation');
const UserMostPlayedGame = use('App/Models/UserMostPlayedGame');
const GameNameField = use('App/Models/GameNameField');
const GameNameController = use('App/Controllers/Http/GameNameController');
const GameSkillController = use('App/Controllers/Http/GameSkillController');
const GameTagController = use('App/Controllers/Http/GameTagController');
const AwsKeyController = use('App/Controllers/Http/AwsKeyController');
const ConnectionController = use('App/Controllers/Http/ConnectionController');
const NotificationController_v2 = use('App/Controllers/Http/NotificationController_v2');
const UsergroupController = use('App/Controllers/Http/UsergroupController');


const UserStatTransactionController = use('App/Controllers/Http/UserStatTransactionController')

const ProfileSchema = require('../../Schemas/Profile');
const GameBackgroundSchema = require('../../Schemas/GameBackground');
const CommendationSchema = require('../../Schemas/Commendation');

const EncryptionRepository = require('../Encryption');
const ElasticsearchRepository = require('../Elasticsearch');
const AchievementsRepository = require('../Achievements')

class ProfileRepository {

  privateKey = null;
  publicKey = null;

  async fetchProfileId({ alias }) {
    const profile = await this.fetchProfileByAlias({ alias });
    return profile.id;
  }

  async fetchProfileInfo({ requestingUserId, id, alias }) {
    const profile = id ? await this.fetchProfileById({ id }) : await this.fetchProfileByAlias({ alias });
    const profileId = profile.id;
    const firstName = await EncryptionRepository.decryptField(profile.first_name);
    const lastName = await EncryptionRepository.decryptField(profile.last_name);
    const email = await EncryptionRepository.decryptField(profile.email);
    const image = profile.profile_img;
    const background = profile.profile_bg;
    const team = profile.team;
    const regional = await EncryptionRepository.decryptField(profile.regional);
    const country = await EncryptionRepository.decryptField(profile.country);
    const timeZone = profile.timeZone;
    const relationship = profile.relationship_status;
    const status = profile.status;
    const level = profile.level;
    const twitch = profile.twitch;
    const discord = profile.discord;
    const steam = profile.steam;
    const youtube = profile.youtube;
    const facebook = profile.facebook;
    const underage = profile.underage;
    const hasMic = profile.has_mic;
    const visibilityName = profile.name_visibility;
    const visibilityEmail = profile.email_visibility;
    const visibilityCountry = profile.country_visibility;
    const lookingForWork = profile.looking_for_work;
    const experience = profile.experience_points;
    const onboarding = profile.onboarding;
    const isSelf = requestingUserId === profileId;
    const [
      isFriend,
      isFollower,
      sponsors,
      friends,
      followers,
      friendRequests,
      hasSentFriendRequest,
      friendRequest,
      languages,
      mostPlayedGames,
      gameExperiences,
      gameBackground,
      { commended, commender },
    ] = await Promise.all([
      this.isFriend({ isSelf, requestingUserId, profileId }),
      this.isFollower({ isSelf, requestingUserId, profileId }),
      this.fetchSponsors({ profileId }),
      this.fetchFriends({ isSelf, requestingUserId }),
      this.fetchFollowers({ isSelf, requestingUserId }),
      this.fetchFriendRequests({ isSelf, requestingUserId }),
      this.hasSentFriendRequest({ isSelf, requestingUserId, profileId }),
      this.fetchFriendRequest({ isSelf, requestingUserId, profileId }),
      this.fetchLanguages({ profileId }),
      this.fetchMostPlayedGames({ profileId }),
      this.fetchGameExperiences({ profileId }),
      this.fetchGameBackground({ profileId }),
      this.fetchCommendations({ profileId }),
    ]);
    const hasReceivedFriendRequest = !!friendRequest.id;
    const friendRequestId = friendRequest.id;
    this.insertBackgroundIntoExperiences({ gameExperiences, gameBackground });
    const profileSchema = new ProfileSchema({
      profileId,
      alias: alias || profile.alias,
      firstName: isSelf || visibilityName === 'public' || (visibilityName === 'friends' && isFriend) ? firstName : '',
      lastName: isSelf || visibilityName === 'public' || (visibilityName === 'friends' && isFriend) ? lastName : '',
      email: isSelf || visibilityEmail === 'public' || (visibilityEmail === 'friends' && isFriend) ? email : '',
      image,
      background,
      languages,
      team,
      country: isSelf || visibilityCountry === 'public' || (visibilityCountry === 'friends' && isFriend) ? regional ? regional + ',' + country : country : '',
      timeZone,
      relationship,
      status,
      level,
      experience,
      twitch,
      discord,
      steam,
      youtube,
      facebook,
      underage,
      hasMic,
      onboarding,
      visibilityName,
      visibilityEmail,
      visibilityCountry,
      lookingForWork,
      isSelf,
      isFriend,
      isFollower,
      sponsors,
      friends,
      followers,
      friendRequests,
      hasSentFriendRequest,
      hasReceivedFriendRequest,
      mostPlayedGames,
      friendRequestId,
      gameExperiences,
      commendations: this.getCommendations({ commended }),
      commended,
      commender,
    });
    return {
      profile: profileSchema,
    }
  }

  async fetchGuestProfile({ alias }) {
    const profile = await this.fetchProfileByAlias({ alias });
    const profileId = profile.id;
    const firstName = await EncryptionRepository.decryptField(profile.first_name);
    const lastName = await EncryptionRepository.decryptField(profile.last_name);
    const email = await EncryptionRepository.decryptField(profile.email);
    const image = profile.profile_img;
    const background = profile.profile_bg;
    const team = profile.team;
    const regional = await EncryptionRepository.decryptField(profile.regional);
    const country = await EncryptionRepository.decryptField(profile.country);
    const timeZone = profile.timeZone;    
    const relationship = profile.relationship_status;
    const status = profile.status;
    const level = profile.level;
    const twitch = profile.twitch;
    const discord = profile.discord;
    const steam = profile.steam;
    const youtube = profile.youtube;
    const facebook = profile.facebook;
    const underage = profile.underage;
    const hasMic = profile.has_mic;
    const visibilityName = profile.name_visibility;
    const visibilityEmail = profile.email_visibility;
    const visibilityCountry = profile.country_visibility;
    const lookingForWork = profile.looking_for_work;
    const experience = profile.experience_points;
    const [
      languages,
      mostPlayedGames,
      gameExperiences,
      gameBackground,
    ] = await Promise.all([
      this.fetchLanguages({ profileId }),
      this.fetchMostPlayedGames({ profileId }),
      this.fetchGameExperiences({ profileId }),
      this.fetchGameBackground({ profileId }),
    ]);
    this.insertBackgroundIntoExperiences({ gameExperiences, gameBackground });
    const profileSchema = new ProfileSchema({
      profileId,
      alias: alias || profile.alias,
      firstName: visibilityName === 'public' ? firstName : '',
      lastName: visibilityName === 'public' ? lastName : '',
      email: visibilityEmail === 'public' ? email : '',
      image,
      background,
      languages,
      team,
      country: visibilityCountry === 'public' ? regional ? regional + ',' + country : country : '',
      timeZone,
      relationship,
      status,
      level,
      experience,
      twitch,
      discord,
      steam,
      youtube,
      facebook,
      underage,
      hasMic,
      visibilityName,
      visibilityEmail,
      visibilityCountry,
      lookingForWork,
      mostPlayedGames,
      gameExperiences,
    });
    return {
      profile: profileSchema,
    }
  }

  async fetchProfileById({ id }) {
    const response = await User.query().where('id', id).fetch();
    const profile = response && response.toJSON()[0];
    if (!profile) {
      await ElasticsearchRepository.removeUser({ id });
      throw new Error("PROFILE_NOT_FOUND");
    }
    return profile;
  }

  async fetchProfileByAlias({ alias }) {
    const response = await User.query().where('alias', alias).fetch();
    const profile = response && response.toJSON()[0];
    if (!profile) {
      await ElasticsearchRepository.removeByAlias({ alias });
      throw new Error("PROFILE_NOT_FOUND");
    }
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

  async fetchFriends({ isSelf, requestingUserId }) {
    if (!isSelf) return [];
    const response = await Database.table('friends')
      .innerJoin('users', 'users.id', 'friends.user_id')
      .where('friends.friend_id', requestingUserId)
      .select('users.alias');
    return response.map((friend) => friend.alias);
  }

  async fetchFriendsForGamer({ requestingUserId, alias, requestedPage }) {
    const friendRequests = await this.fetchFriendRequests({ isSelf: true, requestingUserId });
    const myFriends = await this.fetchFriends({ isSelf: true, requestingUserId });
    const profileId = await this.fetchProfileId({ alias });
    const response = await Database.table('friends')
      .innerJoin('users', 'users.id', 'friends.user_id')
      .where('friends.friend_id', profileId)
      .andWhere('users.id', '!=', requestingUserId)
      .paginate(requestedPage !== 'ALL' ? requestedPage : 0, requestedPage !== 'ALL' ? 4 : 1000);
    const friends = response.data.map((profile) => ({
      profileId: profile.id,
      alias: profile.alias,
      image: profile.profile_img,
      background: profile.profile_bg,
      level: profile.level,
      isFriend: myFriends.includes(profile.alias),
      hasSentFriendRequest: friendRequests.includes(profile.alias),
    })).filter((profile) => profile.profileId !== requestingUserId);
    return { friends };
  }

  async fetchFollowers({ isSelf, requestingUserId }) {
    if (!isSelf) return [];
    const response = await Database.table('followers')
      .innerJoin('users', 'users.id', 'followers.follower_id')
      .where('followers.user_id', requestingUserId)
      .select('users.alias');
    return response.map((follower) => follower.alias);
  }

  async fetchFriendRequests({ isSelf, requestingUserId }) {
    if (!isSelf) return [];
    const response = await Database.table('notifications')
      .innerJoin('users', 'users.id', 'notifications.other_user_id')
      .where('notifications.user_id', requestingUserId)
      .andWhere('notifications.activity_type', 1)
      .select('users.alias');
    return response.map((friend) => friend.alias);
  }

  async fetchSponsors({ profileId }) {
    return Database.table('sponsors').where('sponsors.user_id', profileId).where('sponsors.group_id', 'is', null).select();
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

  async fetchCommendations({ profileId }) {
    const [commendedResponse, commenderResponse] = await Promise.all([
      Commendation.query().where('user_id', profileId).fetch(),
      Commendation.query().where('commender_id', profileId).fetch(),
    ]);
    const commended = commendedResponse && commendedResponse.toJSON ? (commendedResponse.toJSON().map((data) => new CommendationSchema(data))) : [];
    const commender = commenderResponse && commenderResponse.toJSON ? (commenderResponse.toJSON().map((data) => new CommendationSchema(data))) : [];
    return { commended, commender };
  }

  async updateProfile({ requestingUserId, firstName, lastName, team, country, relationship, visibilityName, visibilityEmail, visibilityCountry, lookingForWork, hasMic, underage, languages, twitch, discord, steam, youtube, facebook, mostPlayedGames, timeZone }) {
    const updates = {};
    if (firstName !== undefined) updates.first_name = await EncryptionRepository.encryptField(firstName.trim());
    if (lastName !== undefined) updates.last_name = await EncryptionRepository.encryptField(lastName.trim());
    if (team !== undefined) updates.team = team.trim();
    if (country !== undefined) updates.country = await EncryptionRepository.encryptField(country.split(',').slice(-1)[0].trim());
    if (country !== undefined && country.split(',').length >= 2) updates.regional = await EncryptionRepository.encryptField(country.split(',')[0].trim());
    if (timeZone !== undefined) updates.timeZone = timeZone;
    if (relationship !== undefined) updates.relationship_status = relationship;
    if (visibilityName !== undefined) updates.name_visibility = visibilityName;
    if (visibilityEmail !== undefined) updates.email_visibility = visibilityEmail;
    if (visibilityCountry !== undefined) updates.country_visibility = visibilityCountry;
    if (lookingForWork !== undefined) updates.looking_for_work = lookingForWork;
    if (twitch !== undefined) updates.twitch = twitch;
    if (discord !== undefined) updates.discord = discord;
    if (steam !== undefined) updates.steam = steam;
    if (youtube !== undefined) updates.youtube = youtube;
    if (facebook !== undefined) updates.facebook = facebook;
    if (hasMic !== undefined) updates.has_mic = hasMic;
    if (underage !== undefined) updates.underage = underage;
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
        const game = await Database.from('game_names').where({ game_name: gameName }).select('id', 'game_name');
        const gameId = game && game[0] ? game[0].id : (await createGame(gameName)).id;
        const experience = await GameExperience.query().where({ user_id: requestingUserId }).andWhere({ game_names_id: gameId }).first();
        if (!experience) await this.updateGame({ requestingUserId, game: gameId, level: 'Casual', experience: 'Less than 1 year' });
        const mostPlayedGame = new UserMostPlayedGame();
        mostPlayedGame.user_id = requestingUserId;
        mostPlayedGame.game_name_id = gameId;
        await mostPlayedGame.save();
      }
    }
    await User.query().where('id', requestingUserId).update(updates);
    const { profile } = await this.fetchProfileInfo({ requestingUserId, id: requestingUserId });
    await ElasticsearchRepository.storeUser({ user: profile });
    return { profile };
  }

  async verifyGameUpdates({ game, level, experience }) {
    if (!game) throw new Error('No game was selected.');
    if (!level) throw new Error('No level was selected.');
    if (!experience) throw new Error('No experience was selected.');
  }

  async updateGame({ requestingUserId, id, imageKey, imageSource, mainFields, game, gameName, nickname, level, experience, team, tags, rating, dynamic, background }) {
    const auth = { user: { id: requestingUserId } };
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

    await this.verifyGameUpdates({ game, level, experience });

    const gameExperience = id ? await GameExperience.find(id) : new GameExperience();
    gameExperience.user_id = requestingUserId;
    gameExperience.game_names_id = game;
    gameExperience.main_fields = mainFields;
    gameExperience.level = level;
    gameExperience.experience = experience;
    gameExperience.team = team;
    gameExperience.nickname = nickname;
    gameExperience.tags = tags;
    gameExperience.rating = rating;
    gameExperience.dynamic = JSON.stringify(dynamic);
    const tagController = new GameTagController();
    const tagRequests = tags ? tags.split('|').map((tag) => tagController.store({ auth }, tag, game)) : [];
    await Promise.all(tagRequests).then(() => gameExperience.save());

    await GameBackground.query().where('experience_id', gameExperience.id).delete();
    await Promise.all((background || []).map(experience => {
      const gameBackground = new GameBackground();
      gameBackground.user_id = requestingUserId;
      gameBackground.game_names_id = game;
      gameBackground.experience_id = gameExperience.id;
      gameBackground.team = experience.team;
      gameBackground.role = experience.role;
      gameBackground.experience = experience.experience;
      gameBackground.skills = experience.skills;
      const skillController = new GameSkillController();
      const skillRequests = experience.skills ? experience.skills.split('|').map((skill) => skillController.store({ auth }, skill)) : [];
      return Promise.all(skillRequests).then(() => gameBackground.save());
    }))

    const { profile } = await this.fetchProfileInfo({ requestingUserId, id: requestingUserId });
    if (profile.onboarding == 2) {
      const getVerifiedGrps = await Database.table('groups')
        .where({ verified: 1, game_names_id: game })
        .select('id')
        .first()

      if (getVerifiedGrps != undefined) {
        const usergroupController = new UsergroupController();
        const auth = { user: { id: requestingUserId } };
        const request = { input: () => getVerifiedGrps.id };
        await usergroupController.store({ auth, request }, true)
      }
    }
    await ElasticsearchRepository.storeUser({ user: profile });
    return { gameExperiences: profile.gameExperiences }
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
    const auth = { user: { id: requestingUserId } };
    const request = { input: () => 1 };
    const connectionController = new ConnectionController();
    const { data } = await connectionController.gamers_you_might_know({ auth, request });
    const gamerSuggestions = await Promise.all(data.map(({ alias }) => this.fetchProfileInfo({ requestingUserId, alias })));
    return { gamerSuggestions: gamerSuggestions.map(suggestion => suggestion.profile) };
  }

  async fetchDynamicFields({ gameId }) {
    const response = await GameNameField.query().where('game_names_id', gameId).first();
    if (!response) return [];
    const fields = JSON.parse(response.in_game_fields);
    const placeholders = JSON.parse(response.in_game_field_placeholders);
    const profile_placeholders = JSON.parse(response.in_game_field_profile_placeholders);
    const types = JSON.parse(response.in_game_field_types);
    const labels = JSON.parse(response.in_game_field_labels);
    const values = JSON.parse(response.in_game_field_values);
    return Object.keys(fields).map(key => fields[key]).map((id) => ({
      id,
      placeholder: placeholders[id],
      profile_placeholder: profile_placeholders[id],
      type: types[id],
      label: labels[id],
      values: values[id] ? values[id].split(',') : [],
    }));
  }

  async commendUser({ requestingUserId, alias, gameExperienceId }) {
    const commendedId = await this.fetchProfileId({ alias });
    const existingCommendation = await Commendation.query().where('game_experiences_id', gameExperienceId).andWhere('user_id', commendedId).andWhere('commender_id', requestingUserId).first();
    if (existingCommendation) return this.fetchProfileInfo({ requestingUserId, id: commendedId, alias });

    const notificationController = new NotificationController_v2();
    const commendation = new Commendation();
    const userStatController = new UserStatTransactionController()

    commendation.game_experiences_id = gameExperienceId;
    commendation.user_id = commendedId;
    commendation.commender_id = requestingUserId;
    await commendation.save();

    notificationController.commend({ commendedId, commenderId: requestingUserId });
    userStatController.update_total_number_of(commendedId, 'total_number_of_commendations');
    await AchievementsRepository.registerQuestStep({ user_id: requestingUserId, type: 'commend' });

    const { profile } = await this.fetchProfileInfo({ requestingUserId, id: commendedId, alias });
    await ElasticsearchRepository.storeUser({ user: profile });
    return { profile };
  }

  getCommendations({ commended }) {
    const commendationLevel = (commends) => {
      if (commends < 49) return 'Apprentice'
      if (commends < 99) return 'Elite'
      if (commends < 149) return 'Expert'
      if (commends < 199) return 'Hero'
      if (commends < 249) return 'Master'
      if (commends < 999) return 'Grand Master'
      return 'Ultimate Master'
    }
    const commendations = {};
    commended.forEach((commendation) => {
      if (!commendations[commendation.gameExperienceId]) commendations[commendation.gameExperienceId] = 1;
      else commendations[commendation.gameExperienceId] = commendations[commendation.gameExperienceId] + 1;
    });
    const commendationsList = Object.keys(commendations).map((gameExperienceId) => commendationLevel(commendations[gameExperienceId]));
    if (!commendationsList.includes('Apprentice')) return ['Apprentice', ...commendationsList];
    return commendationsList;
  }

  async deleteGameExperience({ requestingUserId, gameExperienceId }) {
    const gameExperience = await GameExperience.find(gameExperienceId);
    if (!gameExperience) return this.fetchProfileInfo({ requestingUserId, id: requestingUserId })
    const gameController = new GameNameController();
    await Database.table('game_experiences').where({ id: gameExperienceId }).delete();
    await Database.table('user_most_played_games').where({ user_id: requestingUserId }).andWhere({ game_name_id: gameExperience.game_names_id }).delete();
    await gameController.decrementGameCounter({ auth: { user: { id: requestingUserId } } }, gameExperience.game_names_id);
    const { profile } = await this.fetchProfileInfo({ requestingUserId, id: requestingUserId });
    await ElasticsearchRepository.storeUser({ user: profile });
    return { profile };
  }

  async syncToElasticsearch() {
    const users = await Database.from('users').select('id', 'alias');
    await Promise.all(users.map((user) => {
      return this.fetchProfileInfo({ requestingUserId: 0, alias: user.alias }).then((profile) => {
        return ElasticsearchRepository.storeUser({ user: profile.profile });
      });
    }));
    const elasticsearchUserIds = await ElasticsearchRepository.fetchAllUsersIds();
    const mysqlUserIds = users.map((user) => `${user.id}`);
    await Promise.all(elasticsearchUserIds.map((userId) => {
      if (mysqlUserIds.includes(userId)) return;
      return ElasticsearchRepository.removeUser({ id: userId });
    }));
  }
}

module.exports = new ProfileRepository();
