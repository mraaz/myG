#!/usr/bin/env node
import 'source-map-support/register'
import { App } from '@aws-cdk/core'
// import { ClashRoyaleStack } from '../lib/crash-royale/crash-royale-stack'
// import { CoreServicesStack } from '../lib/core-services/core-stack'
import { config } from '../common';
import { CommonStack } from '../lib/clash-royale-proxy/common-stack'
import { ClashRoyaleProxyStack } from '../lib/clash-royale-proxy/clash-royale-proxy-stack'

// This grabs all our required environment variables, and ensures they are exist. Thorws a error if its missing.
const appConfig = config();

// const env = { account: '457469627332', region: 'us-east-1' }
const env = { account: appConfig.ACCOUNT, region: appConfig.REGION };
const app = new App();

const commonStackConstruct = new CommonStack(app, 'ClashRoyaleProxyCommon', {
  stackName: 'clash-royale-proxy-stack-common',
  description: 'Resources shared across the Clash Royale Proxy app.',
  env
});

new ClashRoyaleProxyStack(app, commonStackConstruct, 'ClashRoyaleProxy', appConfig, {
  stackName: `crash-royale-proxy-stack-${appConfig.STAGE}`,
  description: `Crash Royale Proxy app for stage: ${appConfig.STAGE}`,
  env
});

// new CoreServicesStack(app, 'CoreServices', {
//   stackName: 'core-services-stack',
//   description: 'A shared stack for myGs microservices. This stack will be used in other stacks. Contains shared resources.',
//   env
// })

// new ClashRoyaleStack(app, 'ClashRoyaleProxy', {
//   stackName: `crash-royale-stack-${process.env.ENVIRONMENT}`,
//   description: 'Crash Royale API proxy stack.',
//   env
// })
