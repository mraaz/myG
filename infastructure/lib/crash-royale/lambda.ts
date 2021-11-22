// This file creates lambdas and integrates them with the API Gateway.

import * as lambda from '@aws-cdk/aws-lambda'
import { AwsIntegration } from '@aws-cdk/aws-apigateway'
import { Duration } from '@aws-cdk/core'
import { RestApi } from '@aws-cdk/aws-apigateway'
import { IVpc, ISecurityGroup, SubnetType } from '@aws-cdk/aws-ec2'
import * as iam from '@aws-cdk/aws-iam'
import { ClashRoyaleStack } from './crash-royale-stack'
import * as path from 'path'
import { getPrivateVpcSubnet } from './vpc'

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
    integrationHttpMethod: 'GET'

    // options: {
    //   credentialsRole: iam.Role.fromRoleArn(stack, 'imported-role-integration', 'arn:aws:iam::457469627332:role/apig-aws-proxy-role', {
    //     mutable: false
    //   })
    // }
  })
  apiResource.addCorsPreflight({
    allowCredentials: false,
    allowOrigins: ['*']
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
    handler: `build/${handler}.handler`,
    timeout: Duration.minutes(15),
    memorySize: 128,
    code: lambda.Code.fromAsset(path.join(__dirname, '../../../services/clash-royale/dist')),
    retryAttempts: 0,
    vpc,
    securityGroups,
    allowPublicSubnet: true,
    role: iam.Role.fromRoleArn(stack, 'imported-role-lambda', 'arn:aws:iam::457469627332:role/lambda-ex', { mutable: false }),
    environment: {
      TOKEN: process.env.TOKEN || 'UNKOWN_TOKEN',
      ENDPOINT: 'https://api.clashroyale.com/v1'
    }
  })
  return newLambdaFn
}
