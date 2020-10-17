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
    return this.getElasticsearchClient().search({
      index: 'users',
      body: {
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
    })
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