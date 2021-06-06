
const Database = use('Database');
const Team = use('App/Models/Team');
const GameNameController = use('App/Controllers/Http/GameNameController');
const NotificationController = use('App/Controllers/Http/NotificationController_v2');
const AwsKeyController = use('App/Controllers/Http/AwsKeyController');

class TeamRepository {

  async createTeam({ requestingUserId, name, games, image, hashtags, moderators, type, region, language, description, autoAcceptGamers, listOnLFT, recruiting, exclusive, invitationOnly, invitedFriends }) {
    const team = new Team();
    if (name) team.name = name;
    if (image && image.src && image.key) {
      team.image = image.src;
      const keyController = new AwsKeyController();
      await keyController.addTeamImage(image.key);
    }
    if (hashtags) {
      team.hashtags = hashtags.join('|');
      for (const hashtag of hashtags) await this.createTeamHashtag(hashtag);
    }
    if (moderators) team.moderators = moderators.join('|');
    if (type) team.type = type;
    if (region) team.region = region;
    if (language) team.language = language;
    if (description) team.description = description;
    if (autoAcceptGamers !== undefined) team.auto_accept_gamers = autoAcceptGamers;
    if (listOnLFT !== undefined) team.list_on_lft = listOnLFT;
    if (recruiting !== undefined) team.recruiting = recruiting;
    if (exclusive !== undefined) team.exclusive = exclusive;
    if (invitationOnly !== undefined) team.invitation_only = invitationOnly;
    if (games && !!games.filter((gameName) => !!gameName).length) {
      const gameController = new GameNameController();
      const createGame = (gameName) => gameController.createGame({ auth: { user: { id: requestingUserId } } }, gameName);
      const getGameId = async (gameName) => {
        const game = await Database.from('game_names').where({ game_name: gameName }).select('id', 'game_name');
        return game && game[0] ? game[0].id : (await createGame(gameName)).id;
      }
      const validGames = games.filter(gameName => !!gameName);
      if (validGames[0]) team.first_game = await getGameId(validGames[0]);
      if (validGames[1]) team.second_game = await getGameId(validGames[1]);
      if (validGames[2]) team.third_game = await getGameId(validGames[2]);
    }
    await team.save();
    const teamId = team.id;
    if (!!invitedFriends && invitedFriends.length) {
      const notificationController = new NotificationController();
      for (const friendId of invitedFriends) {
        await notificationController.addTeamInvitation({ requestingUserId, teamId, friendId });
      }
    }
    return team;
  }

  async fetchTeamTags(input) {
    const query = Database.table('team_tags');
    if (input) query.where('content', 'like', '%' + input + '%');
    return query.orderBy('counter', 'desc').limit(88);
  }

  async createTeamHashtag(hashtag) {
    const existingTag = await Database.table('team_tags').where({ content: hashtag.trim() }).first()
    if (existingTag) await Database.table('team_tags').where({ content: hashtag.trim() }).update({ counter: existingTag.counter + 1 });
    else {
      await Database.table('team_tags').insert({
        content: hashtag.trim(),
        counter: 1,
      });
    }
  }

}

module.exports = new TeamRepository();