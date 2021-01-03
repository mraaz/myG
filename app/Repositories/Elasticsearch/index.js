const elasticsearch = use('elasticsearch');
const { log } = require('../../Common/logger')

class ElasticsearchRepository {

  client = null;

  getElasticsearchClient() {
    if (!this.client) {
      this.client = new elasticsearch.Client({
        host: process.env.ELASTICSEARCH,
        log: 'error',
        apiVersion: '7.7',
      });
    }
    return this.client;
  }

  async searchUser({ query }) {
    if (process.env.DEBUG_ELASTICSEARCH) log('ELASTICSEARCH', 'Elasticsearch Query:', JSON.stringify(query, null, 2));
    return this.getElasticsearchClient().search({ index: 'users', body: query });
  }

  // TODO: Paginate this using the scroll API:
  // https://www.elastic.co/guide/en/elasticsearch/reference/6.8/search-request-scroll.html
  async fetchAllUsersIds() {
    return this.getElasticsearchClient().search({ index: 'users', body: {
      _source: "",  query: { match_all: {} }, size: 10000,
    }}).then((result) => result.hits.hits.map((hit) => hit._id));
  }

  // TODO: Paginate this using the scroll API:
  // https://www.elastic.co/guide/en/elasticsearch/reference/6.8/search-request-scroll.html
  async fetchAllGamesIds() {
    return this.getElasticsearchClient().search({ index: 'games', body: {
      _source: "",  query: { match_all: {} }, size: 10000,
    }}).then((result) => result.hits.hits.map((hit) => hit._id));
  }

  async storeUser({ user }) {
    log('ELASTICSEARCH', `Storing user in Elasticsearch: ${user.alias}`);
    const gameExperiences = (user.gameExperiences || []).map((experience) => ({ 
      id: experience.game,
      experienceId: experience.id,
      level: experience.level, 
      experience: experience.experience,
      name: experience.gameName,
    }));
    return this.getElasticsearchClient().update({
      index: 'users',
      id: user.profileId,
      body: {
        doc: { ...user, gameExperiences },
        doc_as_upsert: true,
      }
    }).then(() => ({ success: true, error: null })).catch(error => ({ success: false, error }));
  }

  async removeUser({ id }) {
    log('ELASTICSEARCH', `Removing user from Elasticsearch: ${id}`);
    return this.getElasticsearchClient().delete({
      id,
      index: 'users',
    }).then(() => ({ success: true, error: null })).catch(error => ({ success: false, error }));
  }

  async removeByAlias({ alias }) {
    log('ELASTICSEARCH', `Removing user from Elasticsearch: ${alias}`);
    const result = await this.searchUser({ query: { query: { match: { alias } } } });
    const user = result.hits.hits.map(entry => entry._source).find((entry) => entry.alias === alias);
    if (user) await this.removeUser({ id: user.profileId });
  }

  async searchGame({ query }) {
    if (process.env.DEBUG_ELASTICSEARCH) log('ELASTICSEARCH', 'Elasticsearch Query:', JSON.stringify(query, null, 2));
    return this.getElasticsearchClient().search({ index: 'games', body: query });
  }

  async storeGame({ gameInfo }) {
    log('ELASTICSEARCH', `Storing game in Elasticsearch: ${gameInfo.id}`);
    return this.getElasticsearchClient().update({
      index: 'games',
      id: gameInfo.id,
      body: {
        doc: gameInfo,
        doc_as_upsert: true,
      }
    }).then(() => ({ success: true, error: null })).catch(error => ({ success: false, error }));
  }

  async updateAttendees({ id, no_of_gamers }) {
    log('ELASTICSEARCH', `Updating Attendees in Game:`, id, no_of_gamers);
    return this.getElasticsearchClient().update({
      index: 'games',
      id: id,
      body: {
        doc: { attendees: no_of_gamers },
        doc_as_upsert: true,
      }
    }).then(() => ({ success: true, error: null })).catch(error => ({ success: false, error }));
  }

  async removeGame({ id }) {
    log('ELASTICSEARCH', `Removing game from Elasticsearch:`, id);
    return this.getElasticsearchClient().delete({
      id,
      index: 'games',
    }).then(() => ({ success: true, error: null })).catch(error => ({ success: false, error }));
  }
}

module.exports = new ElasticsearchRepository();