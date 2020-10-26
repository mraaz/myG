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
 