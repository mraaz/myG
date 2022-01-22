import { RestApi, EndpointType } from '@aws-cdk/aws-apigateway';
import { PolicyDocument, PolicyStatement, AnyPrincipal, Effect } from '@aws-cdk/aws-iam';
import { CoreServicesStack } from './core-stack';

export const getOrCreateApiGateway = (stack: CoreServicesStack): RestApi => {
  const restApiId = 'microservices-rest-api';
  const restApi = stack.node.tryFindChild(restApiId);

  // If its already exists, return it - dont create it again
  if (!!restApi) {
    return restApi as RestApi;
  }

  // It doesnt exist yet, spin it up
  const newRestApi = new RestApi(stack, restApiId, {
    description: 'An API gateway for myG microservices.',
    endpointConfiguration: {
      types: [EndpointType.REGIONAL]
    },
    deploy: false,
    policy: new PolicyDocument({
      statements: [new PolicyStatement({
        actions: [
          // 'execute-api:Invoke',
          '*',
          'lambda:*',
          'execute-api:*'
        ],
        effect: Effect.ALLOW,
        principals: [new AnyPrincipal],
        resources: ['*'],
      })],
    })
  });

  return newRestApi;
}
