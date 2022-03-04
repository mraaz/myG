import { Stack, Construct, StackProps } from '@aws-cdk/core'
import { getOrCreateLambda, integrateLambdaFunction, getVPC, getSecurityGroups } from './helpers'
import { CommonStack } from './common-stack'
import { AppConfig } from '../../common'

export class ClashRoyaleProxyStack extends Stack {
  constructor(scope: Construct, commonStack: CommonStack, id: string, appConfig: AppConfig, props?: StackProps) {
    super(scope, id, props);

    // Security
    const vpc = getVPC(this);
    const securityGroups = getSecurityGroups(this, id);

    // Create or Fetch Lambda function
    const lambda = getOrCreateLambda(this, appConfig, `clash-royale-proxy-${appConfig.ENVIRONMENT}`, 'lambda', vpc, securityGroups);

    // Lambda Functions
    integrateLambdaFunction(this, appConfig, 'clash-royale-proxy', commonStack.api, '/{proxy+}', 'ANY');
  }
}
