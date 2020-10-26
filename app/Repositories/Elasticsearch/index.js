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

  buildTargetedUsersQuery = (previous, field, value) => {
    if (!previous) previous = { query: { bool: { must: [] } } };
    if (previous.field) previous = this.buildTargetedUsersQuery(null, previous.field, previous.value);
    previous.query.bool.must.push({ fuzzy: { [field]: value } });
    return previous;
  }

  buildUsersQuery = (query) => {
    const targetedQueries = [];
    if (query.includes('alias:')) targetedQueries.push({ field: 'alias', value: query.split('alias:')[1].trim().split(' ')[0] });
    if (query.includes('country:')) targetedQueries.push({ field: 'country', value: query.split('country:')[1].trim().split(' ')[0] });
    if (query.includes('relationship:')) targetedQueries.push({ field: 'relationship', value: query.split('relationship:')[1].trim().split(' ')[0] });
    if (query.includes('commendations:')) targetedQueries.push({ field: 'commendations', value: query.split('commendations:')[1].trim().split(' ')[0] });
    if (query.includes('team:')) targetedQueries.push({ field: 'team', value: query.split('team:')[1].trim().split(' ')[0] });
    if (query.includes('languages:')) targetedQueries.push({ field: 'languages', value: query.split('languages:')[1].trim().split(' ')[0] });
    if (query.includes('mostPlayedGames:')) targetedQueries.push({ field: 'mostPlayedGames', value: query.split('mostPlayedGames:')[1].trim().split(' ')[0] });
    if (query.includes('games:')) targetedQueries.push({ field: 'mostPlayedGames', value: query.split('games:')[1].trim().split(' ')[0] });
    if (query.includes('game:')) targetedQueries.push({ field: 'mostPlayedGames', value: query.split('game:')[1].trim().split(' ')[0] });
    if (targetedQueries.length === 1) return this.buildTargetedUsersQuery(null, targetedQueries[0].field, targetedQueries[0].value);
    if (targetedQueries.length > 1) return targetedQueries.reduce((a, b) => this.buildTargetedUsersQuery(a, b.field, b.value));
    return {
      query: {
        bool: {
          should: [
            {
              fuzzy: {
                alias: query
              }
            },
            {
              fuzzy: {
                country: query
              }
            },
            {
              fuzzy: {
                relationship: query
              }
            },
            {
              fuzzy: {
                commendations: query
              }
            },
            {
              fuzzy: {
                team: query
              }
            },
            {
              fuzzy: {
                languages: query
              }
            },
            {
              fuzzy: {
                mostPlayedGames: query
              }
            },
            {
              match: {
                level: parseInt(query) ? parseInt(query) : 0
              }
            }
          ]
        }
      }
    }
  }

  async searchUser({ query }) {
    const body = this.buildUsersQuery(query);
    if (process.env.DEBUG_ELASTICSEARCH) console.log('Elasticsearch Query:', JSON.stringify(body, null, 2));
    return this.getElasticsearchClient().search({ index: 'users', body });
  }

  async storeUser({ user }) {
    return this.getElasticsearchClient().update({
      index: 'users',
      id: user.profileId,
      body: {
        doc: user,
        doc_as_upsert: true,
      }
    }).then(() => ({ success: true, error: null })).catch(error => ({ success: false, error }));
  }
}

module.exports = new ElasticsearchRepository();