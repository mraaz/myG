import { Stack, Construct, StackProps } from '@aws-cdk/core';
import { getOrCreateApiGateway } from './api-gateway';

export class CoreServicesStack extends Stack {
  constructor(scope: Construct, id: string, stackProps?: StackProps) {
    super(scope, id, stackProps);
    getOrCreateApiGateway(this);
  }
}