// This file creates lambdas and integrates them with the API Gateway.

import * as lambda from '@aws-cdk/aws-lambda'
import { AwsIntegration, RestApi, Deployment, Stage } from '@aws-cdk/aws-apigateway'
import * as iam from '@aws-cdk/aws-iam'
import { ClashRoyaleProxyStack } from '../clash-royale-proxy-stack'
import { CommonStack } from '../common-stack'
import { AppConfig } from '../../../common'

export function integrateLambdaFunction(
  stack: ClashRoyaleProxyStack,
  appConfig: AppConfig,
  lambdaName: string,
  restApi: RestApi,
  path: string,
  method: string,
) {
  const apiResource = restApi.root.resourceForPath(path)
  const integration = new AwsIntegration({
    proxy: true,
    service: 'lambda',
    path: `2015-03-31/functions/arn:aws:lambda:${appConfig.REGION}:${appConfig.ACCOUNT}:function:${lambdaName}-\${stageVariables.stage}/invocations`,
    // The integration method must be POST, regardless of what the REST endpoint expects, as that is what Lambda defines as their invocation API with
    // see: https://stackoverflow.com/questions/41371970/accessdeniedexception-unable-to-determine-service-operation-name-to-be-authoriz
    integrationHttpMethod: 'POST',
    options: {
      credentialsRole: iam.Role.fromRoleArn(stack, 'imported-role-integration', 'arn:aws:iam::457469627332:role/apig-aws-proxy-role', {
        mutable: false
      })
    },
  })

  apiResource.addCorsPreflight({
    allowCredentials: false,
    allowOrigins: ['*']
  })

  apiResource.addMethod(method, integration)

  const deployment = new Deployment(stack,  `api-gateway-deployment-${appConfig.STAGE}`, {
    api: restApi,
  });

  new Stage(stack, `api-gateway-stage-${appConfig.STAGE}`, { deployment, stageName: appConfig.STAGE, variables: { stage: appConfig.STAGE } });
}


