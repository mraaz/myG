import { Stack, Construct, StackProps } from '@aws-cdk/core';
import { RestApi } from '@aws-cdk/aws-apigateway';
import { AppConfig } from '../../common';
import { getOrCreateApiGateway } from './helpers';

export class CommonStack extends Stack {
  public readonly api: RestApi;
  constructor(scope: Construct, id: string, stackProps?: StackProps) {
    super(scope, id, stackProps);
    this.api = getOrCreateApiGateway('clash-royale-proxy', this);
  }
}