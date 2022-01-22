import * as apigateway from '@aws-cdk/aws-apigateway'
import * as iam from '@aws-cdk/aws-iam'
import { RestApi } from '@aws-cdk/aws-apigateway'
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
    },
    policy: new iam.PolicyDocument({
      statements: [new iam.PolicyStatement({
        actions: [
          // 'execute-api:Invoke',
          '*',
          'lambda:*',
          'execute-api:*'
        ],
        effect: iam.Effect.ALLOW,
        principals: [new iam.AnyPrincipal],
        resources: ['*'],
      })],
    })
  })


  return newRestApi
}
