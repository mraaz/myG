import { Stack, Construct, StackProps } from '@aws-cdk/core'
import { getOrCreateLambda } from './lambda'
import { integrateLambdaFunction } from './lambda-integration'
import { getOrCreateRestApi } from './rest-api'
import { getVPC, getSecurityGroups } from './vpc'

export class ClashRoyaleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)
    const stageName = process.env.ENVIRONMENT

    // Security
    const vpc = getVPC(this)
    const securityGroups = getSecurityGroups(this, id)

    // Create or Fetch Lambda function
    const lambda = getOrCreateLambda(this, `clash-royale-${stageName}`, 'lambda', vpc, securityGroups)


    // API Gateway
    const restApi = getOrCreateRestApi(this, 'clash-royale')

    // Lambda Functions
    integrateLambdaFunction(this, restApi, '/{proxy+}', 'ANY', lambda)
  }
}
