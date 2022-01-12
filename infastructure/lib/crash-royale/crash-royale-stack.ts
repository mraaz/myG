import { Stack, Construct, StackProps } from '@aws-cdk/core'
import { integrateLambdaFunction } from './lambda'
import { getOrCreateRestApi } from './rest-api'
import { getVPC, getSecurityGroups } from './vpc'

export class ClashRoyaleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    // Security
    const vpc = getVPC(this)
    const securityGroups = getSecurityGroups(this, id)
    // API Gateway
    const restApi = getOrCreateRestApi(this, 'clash-royale')

    // Lambda Functions
    integrateLambdaFunction(this, 'clash-royale', 'lambda', restApi, '/{proxy+}', 'ANY', vpc, securityGroups)
  }
}
