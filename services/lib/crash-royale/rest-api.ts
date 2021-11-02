import * as apigateway from '@aws-cdk/aws-apigateway'
import { RestApi } from '@aws-cdk/aws-apigateway'
import * as certManager from '@aws-cdk/aws-certificatemanager'
import { ClashRoyaleStack } from './crash-royale-stack'

export function getOrCreateRestApi(stack: ClashRoyaleStack, serviceId: string): RestApi {
  const stageName = process.env.ENVIRONMENT
  // const accessLogFormat = getAccessLogFormat()
  const restApiId = `${serviceId}-rest-api`
  const restApi = stack.node.tryFindChild(restApiId)

  if (!!restApi) {
    return restApi as RestApi
  }

  const newRestApi = new RestApi(stack, restApiId, {
    endpointConfiguration: {
      types: [apigateway.EndpointType.REGIONAL]
    },
    deploy: true,
    deployOptions: {
      stageName
      // accessLogDestination,
      // accessLogFormat
    }
  })
  newRestApi.addDomainName(`${restApiId}-domain`, {
    domainName: `${process.env.AWS_API_GATEWAY_CUSTOM_DOMAIN_NAME}`,
    certificate: certManager.Certificate.fromCertificateArn(stack, 'Certificate', `${process.env.AWS_API_GATEWAY_CERTIFICATE_ROLE_ARN}`),
    endpointType: apigateway.EndpointType.REGIONAL,
    securityPolicy: apigateway.SecurityPolicy.TLS_1_2
  })

  const responseHeaders = {
    'Access-Control-Allow-Origin': `'*'`
    // 'Access-Control-Allow-Methods': `'${allowMethods.join(',')}'`,
    // 'Access-Control-Allow-Headers': `'${allowHeaders.join(',')}'`,
  }
  newRestApi.addGatewayResponse(`${serviceId}-rest-api-response-4xx`, {
    type: apigateway.ResponseType.DEFAULT_4XX,
    responseHeaders
  })
  newRestApi.addGatewayResponse(`${serviceId}-rest-api-response-5xx`, {
    type: apigateway.ResponseType.DEFAULT_5XX,
    responseHeaders
  })

  return newRestApi
}

function getAccessLogFormat() {
  return apigateway.AccessLogFormat.custom(
    '{"requestTime":"$context.requestTime","requestId":"$context.requestId","xrayTraceId": "$context.xrayTraceId","httpMethod":"$context.httpMethod","path":"$context.path","routeKey":"$context.routeKey","status":$context.status,"responseLatency":$context.responseLatency,"integrationRequestId":"$context.integration.requestId","functionResponseStatus":"$context.integration.status","integrationLatency":"$context.integration.latency","integrationServiceStatus":"$context.integration.integrationStatus","ip":"$context.identity.sourceIp","userAgent":"$context.identity.userAgent","cognitoUser": "$context.identity.cognitoIdentityId"}'
  )
}
