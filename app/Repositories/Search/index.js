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
    const query = { query: { bool: { must: [], should: [] } } };
    const targetedQueries = [query];
    if (input.includes('alias:')) targetedQueries.push({ field: 'alias', value: input.split('alias:')[1].trim().split(' ')[0] });
    if (input.includes('country:')) targetedQueries.push({ field: 'country', value: input.split('country:')[1].trim().split(' ')[0] });
    if (input.includes('relationship:')) targetedQueries.push({ field: 'relationship', value: input.split('relationship:')[1].trim().split(' ')[0] });
    if (input.includes('commendations:')) targetedQueries.push({ field: 'commendations', value: input.split('commendations:')[1].trim().split(' ')[0] });
    if (input.includes('team:')) targetedQueries.push({ field: 'team', value: input.split('team:')[1].trim().split(' ')[0] });
    if (input.includes('languages:')) targetedQueries.push({ field: 'languages', value: input.split('languages:')[1].trim().split(' ')[0] });
    if (input.includes('mostPlayedGames:')) targetedQueries.push({ field: 'mostPlayedGames', value: input.split('mostPlayedGames:')[1].trim().split(' ')[0] });
    if (input.includes('games:')) targetedQueries.push({ field: 'mostPlayedGames', value: input.split('games:')[1].trim().split(' ')[0] });
    if (input.includes('game:')) targetedQueries.push({ field: 'mostPlayedGames', value: input.split('game:')[1].trim().split(' ')[0] });
    if (targetedQueries.length === 1) this.buildTargetedUsersQuery(query, targetedQueries[0].field, targetedQueries[0].value);
    if (targetedQueries.length > 1) targetedQueries.reduce((a, b) => this.buildTargetedUsersQuery(a, b.field, b.value));
    const orSearch = input.split(' ').filter((value) => !value.includes(':')).join(' ');
    query.query.bool.should.push({ match: { alias: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { country: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { relationship: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { commendations: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { team: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { languages: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { mostPlayedGames: { query: orSearch, fuzziness: "auto" } } });
    query.query.bool.should.push({ match: { level: parseInt(orSearch) ? parseInt(orSearch) : 0 } });
    return query;
  }

  async searchGamers({ query }) {
    const cleanUser = (user) => ({ ...user, firstName: '', lastName: '', email: '' });
    const result = await ElasticsearchRepository.searchUser({ query: this.buildUsersQuery(query) });
    const gamers = result.hits.hits.map((hit) => cleanUser(hit._source));
    return { gamers };
  }
}

module.exports = new SearchRepository();
 