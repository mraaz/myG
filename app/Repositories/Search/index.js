const User = use('App/Models/User');
const ElasticsearchRepository = require('../Elasticsearch');

class SearchRepository {

  buildTargetedUsersQuery = (previous, field, value) => {
    if (!previous) previous = { query: { bool: { must: [] } } };
    if (!field || !value) return previous;
    if (previous.field) previous = this.buildTargetedUsersQuery(null, previous.field, previous.value);
    previous.query.bool.must.push({ match: { [field]: { query: value, fuzziness: "auto" } } });
    return previous;
  }

  buildUsersQuery = (input) => {
    if (!input) return { query: { match_all: {} } };
    const query = { query: { bool: { must: [], should: [] } } };
    const targetedQueries = [query];
    if (input.includes('alias:')) targetedQueries.push({ field: 'alias', value: input.split('alias:')[1].trim().split(' ')[0] });
    if (input.includes('country:')) targetedQueries.push({ field: 'country', value: input.split('country:')[1].trim().split(' ')[0] });
    if (input.includes('relationship:')) targetedQueries.push({ field: 'relationship', value: input.split('relationship:')[1].trim().split(' ')[0] });
    if (input.includes('commendations:')) targetedQueries.push({ field: 'commendations', value: input.split('commendations:')[1].trim().split(' ')[0] });
    if (input.includes('commend:')) targetedQueries.push({ field: 'commendations', value: input.split('commend:')[1].trim().split(' ')[0] });
    if (input.includes('team:')) targetedQueries.push({ field: 'team', value: input.split('team:')[1].trim().split(' ')[0] });
    if (input.includes('languages:')) targetedQueries.push({ field: 'languages', value: input.split('languages:')[1].trim().split(' ')[0] });
    if (input.includes('language:')) targetedQueries.push({ field: 'languages', value: input.split('language:')[1].trim().split(' ')[0] });
    if (input.includes('mostPlayedGames:')) targetedQueries.push({ field: 'mostPlayedGames', value: input.split('mostPlayedGames:')[1].trim().split(' ')[0] });
    if (input.includes('games:')) targetedQueries.push({ field: 'mostPlayedGames', value: input.split('games:')[1].trim().split(' ')[0] });
    if (input.includes('game:')) targetedQueries.push({ field: 'mostPlayedGames', value: input.split('game:')[1].trim().split(' ')[0] });
    if (targetedQueries.length === 1) this.buildTargetedUsersQuery(query, targetedQueries[0].field, targetedQueries[0].value);
    if (targetedQueries.length > 1) targetedQueries.reduce((a, b) => this.buildTargetedUsersQuery(a, b.field, b.value));
    const values = targetedQueries.map((field) => field.value).filter((value) => !!value);
    const orSearch = input.split(' ').filter((value) => !value.includes(':')).filter((value) => !values.includes(value)).join(' ');
    query.query.bool.should.push({ match: { alias: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { country: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { relationship: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { commendations: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { team: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { languages: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { mostPlayedGames: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { 'gameExperiences.name': { query: orSearch, fuzziness: "auto" } } });
    if (parseInt(orSearch)) query.query.bool.should.push({ match: { level: parseInt(orSearch) } });
    return query;
  }

  buildGamesQuery = (input) => {
    const hasEndDate = input.end_date_time && input.end_date_time !== input.start_date_time;
    const query = { query: { bool: { must: [] } } };
    query.size = 10;
    query.from = ((parseInt(input.counter) || 1) - 1) * 10;
    query.query.bool.must.push({ match: { visibility: true } });
    if (input.game_name) query.query.bool.must.push({ match: { 'game_name.keyword': input.game_name } });
    if (input.experience) query.query.bool.must.push({ match: { 'experience.keyword': input.experience } });
    if (input.start_date_time) query.query.bool.must.push({ range: { start_date_time: { gte: input.start_date_time } } });
    if (hasEndDate) query.query.bool.must.push({ range: { end_date_time: { lte: input.end_date_time } } });
    if (input.description) query.query.bool.must.push({ match: { description: { query: input.description, fuzziness: 'auto' } } });
    if (input.tags) input.tags.forEach((tag) => query.query.bool.must.push({ match: { ['tags.keyword']: tag } }));
    if (input.platform) query.query.bool.must.push({ match: { 'platform.keyword': input.platform } });
    if (input.region) query.query.bool.must.push({ match: { 'region.keyword': input.region } });
    if (input.game_languages) query.query.bool.must.push({ match: { 'game_languages.keyword': input.game_languages } });
    if (input.value_one) query.query.bool.must.push({ match: { 'dynamic_fields.value_one.keyword': typeof input.value_one === 'string' ? input.value_one : input.value_one[Object.keys(input.value_one)[0]] } });
    if (input.value_two) query.query.bool.must.push({ match: { 'dynamic_fields.value_two.keyword': typeof input.value_two === 'string' ? input.value_two : input.value_two[Object.keys(input.value_two)[0]] } });
    if (input.value_three) query.query.bool.must.push({ match: { 'dynamic_fields.value_three.keyword': typeof input.value_three === 'string' ? input.value_three : input.value_three[Object.keys(input.value_three)[0]] } });
    if (input.value_four) query.query.bool.must.push({ match: { 'dynamic_fields.value_four.keyword': typeof input.value_four === 'string' ? input.value_four : input.value_four[Object.keys(input.value_four)[0]] } });
    if (input.value_five) query.query.bool.must.push({ match: { 'dynamic_fields.value_five.keyword': typeof input.value_five === 'string' ? input.value_five : input.value_five[Object.keys(input.value_five)[0]] } });
    if (input.mic !== null) query.query.bool.must.push({ match: { mic: input.mic } });
    if (input.eighteen_plus !== null) query.query.bool.must.push({ match: { eighteen_plus: input.eighteen_plus } });
    return query;
  }

  async searchGamers({ requestingUserId, query, online }) {
    const cleanUser = (user) => ({ ...user, profileId: parseInt(user.profileId), firstName: '', lastName: '', email: '' });
    const result = await ElasticsearchRepository.searchUser({ query: this.buildUsersQuery(query) });
    const parsedResults = result.hits.hits.map((hit) => cleanUser(hit._source)).filter(({ profileId }) => profileId !== requestingUserId);
    const gamers = await this.filterOnlineGamers(parsedResults, online === 'true');
    return { gamers };
  }

  async filterOnlineGamers(gamers, online) {
    if (!online) return Promise.resolve(gamers);
    const onlineUsers = await User.query().select('id')
      .where('id', 'in', gamers.map((gamer) => gamer.profileId))
      .andWhere('status', 'online')
      .fetch();
    const onlineUsersIds = onlineUsers ? onlineUsers.toJSON().map((user) => user.id) : [];
    return gamers.filter((gamer) => onlineUsersIds.includes(gamer.profileId));
  }

  async searchGames({ query }) {
    const result = await ElasticsearchRepository.searchGame({ query: this.buildGamesQuery(query) });
    const latestScheduledGames = result.hits.hits.map((hit) => ({
      ...hit._source,
      no_of_gamers: hit._source.attendees,
      tags: (hit._source.tags || []).map((content) => ({ content }))
    }));
    return { latestScheduledGames };
  }
}

module.exports = new SearchRepository();
