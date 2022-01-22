// This file creates lambdas and integrates them with the API Gateway.

import * as lambda from '@aws-cdk/aws-lambda'
import { AwsIntegration } from '@aws-cdk/aws-apigateway'
import { RestApi } from '@aws-cdk/aws-apigateway'
import * as iam from '@aws-cdk/aws-iam'
import { ClashRoyaleStack } from './crash-royale-stack'

export function integrateLambdaFunction(
  stack: ClashRoyaleStack,
  restApi: RestApi,
  path: string,
  method: string,
  lambdaFn: lambda.Function
) {
  const apiResource = restApi.root.resourceForPath(path)
  const integration = new AwsIntegration({
    proxy: true,
    service: 'lambda',
    path: `2015-03-31/functions/${lambdaFn.functionArn}/invocations`,
    // The integration method must be POST, regardless of what the REST endpoint expects, as that is what Lambda defines as their invocation API with
    // see: https://stackoverflow.com/questions/41371970/accessdeniedexception-unable-to-determine-service-operation-name-to-be-authoriz
    integrationHttpMethod: 'POST',
    options: {
      credentialsRole: iam.Role.fromRoleArn(stack, 'imported-role-integration', 'arn:aws:iam::457469627332:role/apig-aws-proxy-role', {
        mutable: false
      })
    }
  })
  apiResource.addCorsPreflight({
    allowCredentials: false,
    allowOrigins: ['*']
  })
  apiResource.addMethod(method, integration)
}


