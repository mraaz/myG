import * as path from 'path'

import { Duration } from '@aws-cdk/core'
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda'
import { Role } from '@aws-cdk/aws-iam'
import { IVpc, ISecurityGroup, SubnetType } from '@aws-cdk/aws-ec2'

import { ClashRoyaleProxyStack } from '../clash-royale-proxy-stack'
import { AppConfig } from '../../../common'


export function getOrCreateLambda(
    stack: ClashRoyaleProxyStack,
    appConfig: AppConfig,
    functionName: string,
    handler: string,
    vpc: IVpc,
    securityGroups: ISecurityGroup[]
  ): Function {
    const lambdaFn = stack.node.tryFindChild(`lambda-${functionName}`)
  
    if (lambdaFn) {
      return lambdaFn as Function
    }
  
    const newLambdaFn = new Function(stack, `lambda-${functionName}`, {
      functionName,
      runtime: Runtime.NODEJS_12_X,
      handler: `build/${handler}.handler`,
      timeout: Duration.minutes(15),
      memorySize: 128,
      code: Code.fromAsset(path.join(__dirname, '../../../../services/clash-royale-proxy/dist')),
      retryAttempts: 0,
      vpc,
      securityGroups,
      allowPublicSubnet: true,
      role: Role.fromRoleArn(stack, 'imported-role-lambda', 'arn:aws:iam::457469627332:role/lambda-ex', { mutable: false }),
      environment: {
        TOKEN: appConfig.TOKEN,
        ENDPOINT: 'https://api.clashroyale.com/v1',
        SECRET: appConfig.SECRET
      }
    })
    return newLambdaFn
  }