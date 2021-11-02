// This file creates lambdas and integrates them with the API Gateway.

import * as lambda from '@aws-cdk/aws-lambda'
import { AwsIntegration } from '@aws-cdk/aws-apigateway'
import { Duration } from '@aws-cdk/core'
import { RestApi } from '@aws-cdk/aws-apigateway'
import { IVpc, ISecurityGroup } from '@aws-cdk/aws-ec2'
import { ClashRoyaleStack } from './crash-royale-stack'
import * as path from 'path'

export function integrateLambdaFunction(
  stack: ClashRoyaleStack,
  functionName: string,
  handler: string,
  restApi: RestApi,
  path: string,
  method: string,
  vpc: IVpc,
  securityGroups: ISecurityGroup[]
) {
  const lambdaFn = getOrCreateLambda(stack, functionName, handler, vpc, securityGroups)
  const apiResource = restApi.root.resourceForPath(path)
  const integration = new AwsIntegration({
    proxy: true,
    service: 'lambda',
    path: `2015-03-31/functions/${lambdaFn.functionArn}/invocations`,
    integrationHttpMethod: 'POST'
  })
  apiResource.addCorsPreflight({
    allowCredentials: false,
    // allowOrigins: process.env.ALLOW_ORIGINS?.split(',') || ['*']
    allowOrigins: ['*']
    // allowHeaders,
    // allowMethods,
  })
  apiResource.addMethod(method, integration)
}

export function getOrCreateLambda(
  stack: ClashRoyaleStack,
  functionName: string,
  handler: string,
  vpc: IVpc,
  securityGroups: ISecurityGroup[]
): lambda.Function {
  const lambdaFn = stack.node.tryFindChild(`lambda-${functionName}`)

  if (lambdaFn) {
    return lambdaFn as lambda.Function
  }

  const newLambdaFn = new lambda.Function(stack, `lambda-${functionName}`, {
    functionName,
    runtime: lambda.Runtime.NODEJS_12_X,
    handler: `${handler}.handler`,
    timeout: Duration.minutes(15),
    memorySize: 128,
    code: lambda.Code.fromAsset('lib/crash-royale/resources'),
    retryAttempts: 0,
    vpc,
    securityGroups
  })
  return newLambdaFn
}
