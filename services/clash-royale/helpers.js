/**
 * Assembles query parameters.
 *
 * @param  {array}  queries The query string component from the request.
 * @return {string}         The query string joined using `&`.
 */
module.exports.assembleQuery = function (queries) {
  var query = []
  for (var property in queries) {
    query.push(property + '=' + queries[property])
  }
  return query.join('&')
}

/**
 * Assembles request path.
 *
 * @param  {string} path  The path component of the request.
 * @param  {string} query The query string of the request.
 * @return {string}       The path and the query joined using `?`.
 */
module.exports.assembleRequest = function (path, query) {
  if (0 === Object.keys(query).length) {
    // There are no query vars so just use path.
    return path
  }
  return [path, query].join('?')
}

/**
 * Assemble the response to send to API Gateway.
 *
 * NOTE: If the new domain includes a query string, discard the request URI and
 * just use the explicit domain given.
 *
 * @param  {string} requestUri The path and the query joined using `?`.
 * @return {json}              The response sent to API Gateway via the Lambda proxy integration.
 *                             See: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-output-format
 */
module.exports.assembleResponse = function (requestUri) {
  var location
  if (process.env.NEW_DOMAIN.includes('?') || !process.env.NEW_DOMAIN.endsWith('/')) {
    location = process.env.NEW_DOMAIN
  } else {
    location = process.env.NEW_DOMAIN + requestUri
  }
  return {
    statusCode: process.env.HTTP_RESPONSE,
    headers: {
      Location: location
    },
    body: null
  }
}
