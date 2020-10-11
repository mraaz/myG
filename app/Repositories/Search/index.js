
const cryptico = require('cryptico');
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
const AwsKeyController = use('App/Controllers/Http/AwsKeyController');
const ConnectionController = use('App/Controllers/Http/ConnectionController');
const NotificationController_v2 = use('App/Controllers/Http/NotificationController_v2');

const ProfileSchema = require('../../Schemas/Profile');
const GameExperienceSchema = require('../../Schemas/GameExperience');
const GameBackgroundSchema = require('../../Schemas/GameBackground');
const CommendationSchema = require('../../Schemas/Commendation');

const ElasticsearchRepository = require('../Elasticsearch');

class SearchRepository {
  async searchGamers({ query }) {
    const cleanUser = (user) => ({ ...user, firstName: '', lastName: '', email: '' });
    const result = await ElasticsearchRepository.searchUser({ query });
    const gamers = result.hits.hits.map((hit) => cleanUser(hit._source));
    return { gamers };
  }
}

module.exports = new SearchRepository();
 