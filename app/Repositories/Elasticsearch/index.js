const elasticsearch = use('elasticsearch');

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
    if (process.env.DEBUG_ELASTICSEARCH) console.log('Elasticsearch Query:', JSON.stringify(query, null, 2));
    return this.getElasticsearchClient().search({ index: 'users', body: query });
  }

  async storeUser({ user }) {
    console.log(`Storing user in Elasticsearch:`, user);
    const gameExperiences = (user.gameExperiences || []).map((experience) => ({ 
      id: experience.game, 
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

  async searchGame({ query }) {
    if (process.env.DEBUG_ELASTICSEARCH) console.log('Elasticsearch Query:', JSON.stringify(query, null, 2));
    return this.getElasticsearchClient().search({ index: 'games', body: query });
  }

  async storeGame({ gameInfo }) {
    console.log(`Storing game in Elasticsearch:`, gameInfo);
    return this.getElasticsearchClient().update({
      index: 'games',
      id: gameInfo.id,
      body: {
        doc: gameInfo,
        doc_as_upsert: true,
      }
    }).then(() => ({ success: true, error: null })).catch(error => ({ success: false, error }));
  }

  async removeGame({ id }) {
    console.log(`Removing game from Elasticsearch:`, id);
    return this.getElasticsearchClient().delete({
      id,
      index: 'games',
    }).then(() => ({ success: true, error: null })).catch(error => ({ success: false, error }));
  }
}

module.exports = new ElasticsearchRepository();