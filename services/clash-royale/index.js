const axios = require('axios')
var helper = require('./helpers');

exports.main = async function (event, context) {
  const token = process.env.TOKEN
  const CONFIG = {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 5000
  }

  var query = helper.assembleQuery(event.queryStringParameters);
  var requestUri = helper.assembleRequest(event.path, query);
  console.log('hihihihih: ', JSON.stringify(event), event.path, query, requestUri);

  const getClanURL = 'clans/' + '%23' + 'QG8UQCV0' + '/members'
  console.log('onCrashRoyaleRequest: \n' + JSON.stringify(event, null, 2))

  return axios
    .get(`https://api.clashroyale.com/v1/${getClanURL}`, CONFIG)
    .then(res => {
      console.log('hi', JSON.stringify(res.data))
      return { statusCode: 200, body: JSON.stringify(res.data) }
    })
    .catch(e => {
      console.log('bye', e)
      return { statusCode: 201, body: JSON.stringify({ failed: true, error: e }) }
    })
}