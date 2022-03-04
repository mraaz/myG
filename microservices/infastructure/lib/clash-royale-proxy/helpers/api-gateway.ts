import { RestApi, EndpointType } from '@aws-cdk/aws-apigateway';
import { PolicyDocument, PolicyStatement, AnyPrincipal, Effect } from '@aws-cdk/aws-iam';

import { CommonStack } from '../common-stack';

export const getOrCreateApiGateway = (appName: string, stack: CommonStack): RestApi => {
  const restApiId = `${appName}-rest-api`;

  // It doesnt exist yet, spin it up
  const newRestApi = new RestApi(stack, restApiId, {
    description: 'An API gateway for the clash royale proxy.',
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
      })]
    }),
    
  });

  return newRestApi;
}

export const getApiGateway = (appName: string, stack: CommonStack): RestApi => {
  const restApiId = `${appName}-rest-api`;
  // const restApi = RestApi.fromRestApiId(stack, 'ClashRoyaleProxyCommon', restApiId);
  const restApi = stack.node.tryFindChild(restApiId);
  console.log(stack.node.children)
  // If its already exists, return it - dont create it again
  if (!restApi) {
    throw new Error(`Cannot find api gateway, name: ${restApiId}, in stack, name: ${stack.stackName}`);
  }

  // Return the fetched api gateway
  return restApi as RestApi;
}
