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
    if (process.env.DEBUG_ELASTICSEARCH) log('ELASTICSEARCH', `Elasticsearch Query: ${JSON.stringify(query, null, 2)}`);
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
    delete user.status;
    const gameExperiences = (user.gameExperiences || []).map((experience) => {
      const dynamic = experience.dynamic || {};
      const extraFields = {};
      Object.keys(dynamic).forEach((field) => {
        if (dynamic[field].text) extraFields[dynamic[field].text] = this.forceArray(dynamic[field].value)
          .map(({ value }) => `${value}`.trim())
          .filter((value => !!value))
          .join('|');
      });
      const userToStore = {
        id: experience.game,
        experienceId: experience.id,
        level: experience.level,
        experience: experience.experience,
        name: experience.gameName,
        ...extraFields,
      };
      return userToStore;
    });
    return this.getElasticsearchClient().update({
      index: 'users',
      id: user.profileId,
      body: {
        doc: { ...user, gameExperiences },
        doc_as_upsert: true,
      }
    }).then(() => ({ success: true, error: null })).catch(error => {
      console.error('Failed to Update Elasticsearch: ', error);
      return ({ success: false, error });
    });
  }

  async removeUser({ id }) {
    log('ELASTICSEARCH', `Removing user from Elasticsearch: ${id}`);
    return this.getElasticsearchClient().delete({
      id,
      index: 'users',
    }).then(() => ({ success: true, error: null })).catch(error => {
      console.error('Failed to Update Elasticsearch: ', error);
      return ({ success: false, error });
    });
  }

  async removeByAlias({ alias }) {
    log('ELASTICSEARCH', `Removing user from Elasticsearch: ${alias}`);
    const result = await this.searchUser({ query: { query: { match: { alias } } } });
    const user = result.hits.hits.map(entry => entry._source).find((entry) => entry.alias === alias);
    if (user) await this.removeUser({ id: user.profileId });
  }

  async searchGame({ query }) {
    if (process.env.DEBUG_ELASTICSEARCH) log('ELASTICSEARCH', `Elasticsearch Query: ${JSON.stringify(query, null, 2)}`);
    return this.getElasticsearchClient().search({ index: 'games', body: query });
  }

  async storeGame({ gameInfo }) {
    log('ELASTICSEARCH', `Storing game in Elasticsearch: ${gameInfo.id}`);
    return this.getElasticsearchClient().update({
      index: 'games',
      id: gameInfo.id,
      body: {
        doc: {
          ...gameInfo,
          visibility: !!gameInfo.visibility,
          vacancy: !!gameInfo.vacancy,
          autoJoin: !!gameInfo.autoJoin,
          autoJoinHost: !!gameInfo.autoJoinHost,
          mic: !!gameInfo.mic,
          eighteen_plus: !!gameInfo.eighteen_plus,
          marked_as_deleted: !!gameInfo.marked_as_deleted,
          allow_comments: !!gameInfo.allow_comments,
          start_date_time: gameInfo.start_date_time.replace ? gameInfo.start_date_time.replace(' ', 'T') : gameInfo.start_date_time,
          end_date_time: gameInfo.end_date_time.replace ? gameInfo.end_date_time.replace(' ', 'T') : gameInfo.end_date_time,
          expiry: gameInfo.expiry.replace ? gameInfo.expiry.replace(' ', 'T') : gameInfo.expiry,
        },
        doc_as_upsert: true,
      }
    }).then(() => ({ success: true, error: null })).catch(error => {
      console.error('Failed to Update Elasticsearch: ', error);
      return ({ success: false, error });
    });
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
    }).then(() => ({ success: true, error: null })).catch(error => {
      console.error('Failed to Update Elasticsearch: ', error);
      return ({ success: false, error });
    });
  }

  async removeGame({ id }) {
    log('ELASTICSEARCH', `Removing game from Elasticsearch: ${id}`);
    return this.getElasticsearchClient().delete({
      id,
      index: 'games',
    }).then(() => ({ success: true, error: null })).catch(error => {
      console.error('Failed to Update Elasticsearch: ', error);
      return ({ success: false, error });
    });
  }

  // TODO: Paginate this using the scroll API:
  // https://www.elastic.co/guide/en/elasticsearch/reference/6.8/search-request-scroll.html
  async fetchAllGameNameIds() {
    return this.getElasticsearchClient().search({ index: 'game_names', body: {
      _source: "",  query: { match_all: {} }, size: 10000,
    }}).then((result) => result.hits.hits.map((hit) => hit._id));
  }

  async fetchTopGameNames() {
    return this.getElasticsearchClient().search({ index: 'game_names', body: {
      query: { match_all: {} },
      sort: [{ counter: { order: "desc" } }],
    }}).then((result) => result.hits.hits.map((hit) => hit._source));
  }

  async searchGameNames(input) {
    return this.getElasticsearchClient().search({ index: 'game_names', body: {
      query: { match: { game_name: { query: input, fuzziness: "auto" } } },
    }}).then((result) => result.hits.hits.map((hit) => hit._source));
  }

  async storeGameName(gameName) {
    log('ELASTICSEARCH', `Storing game name in Elasticsearch: ${gameName.id}`);
    return this.getElasticsearchClient().update({
      index: 'game_names',
      id: gameName.id,
      body: {
        doc: gameName,
        doc_as_upsert: true,
      }
    }).then(() => ({ success: true, error: null })).catch(error => {
      console.error('Failed to Update Elasticsearch: ', error);
      return ({ success: false, error });
    });
  }

  async removeGameName({ id }) {
    log('ELASTICSEARCH', `Removing game from Elasticsearch: ${id}`);
    return this.getElasticsearchClient().delete({
      id,
      index: 'game_names',
    }).then(() => ({ success: true, error: null })).catch(error => {
      console.error('Failed to Update Elasticsearch: ', error);
      return ({ success: false, error });
    });
  }

  forceArray(value) {
    if (Array.isArray(value)) return value
    const parsed = this.forceJson(value)
    if (Array.isArray(parsed)) return parsed
    return [parsed].filter(parsed => !!parsed);
  }

  forceJson(value) {
    try {
      return JSON.parse(value)
    } catch (_) {
      return (typeof value === 'object' && value !== null) ? value : {}
    }
  }
}

module.exports = new ElasticsearchRepository();
