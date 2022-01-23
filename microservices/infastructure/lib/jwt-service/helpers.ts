import { RestApi } from '@aws-cdk/aws-apigateway';
import { CoreServicesStack } from '../core-services/core-stack';
import { JwtServiceStack } from './jwt-stack';

export const getApiGateway = (restApiId: string, coreStack: CoreServicesStack): RestApi => {
  const restApi = coreStack.node.tryFindChild(restApiId);

  // If its already exists, return it - dont create it again
  if (!restApi) {
    throw new Error(`Cannot find api gateway, name: ${restApiId}, in stack, name: ${coreStack.stackName}`);
  }

  // Return the fetched api gateway
  return restApi as RestApi;
}
