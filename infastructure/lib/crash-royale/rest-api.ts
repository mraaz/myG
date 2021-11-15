import * as apigateway from '@aws-cdk/aws-apigateway'
import { RestApi } from '@aws-cdk/aws-apigateway'
import * as certManager from '@aws-cdk/aws-certificatemanager'
import { ClashRoyaleStack } from './crash-royale-stack'

export function getOrCreateRestApi(stack: ClashRoyaleStack, serviceId: string): RestApi {
  const stageName = process.env.ENVIRONMENT
  const restApiId = `${serviceId}-rest-api`
  const restApi = stack.node.tryFindChild(restApiId)

  if (!!restApi) {
    return restApi as RestApi
  }

  const newRestApi = new RestApi(stack, restApiId, {
    description: 'An API gateway for clash royale proxy.',
    endpointConfiguration: {
      types: [apigateway.EndpointType.REGIONAL]
    },
    deploy: true,
    deployOptions: {
      stageName
    }
  })

  return newRestApi
}
