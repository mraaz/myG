import { Stack, Construct, StackProps } from '@aws-cdk/core';
import { CoreServicesStack } from '../core-services/core-stack';
import { getApiGateway } from './helpers';

export interface MicroservicesProps {
  stageName: 'Development' | 'Production';
}

export class JwtServiceStack extends Stack {
  constructor(scope: Construct, coreStack: CoreServicesStack, id: string, props: MicroservicesProps, stackProps?: StackProps) {
    super(scope, id, stackProps);

    const restApi = getApiGateway('microservices-rest-api', coreStack);
  }
}