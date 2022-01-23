#!/usr/bin/env node
import 'source-map-support/register'
import { App } from '@aws-cdk/core'

import { RequiredEnvVars, getRuntimeEnvironmentVariables } from '../common';
import { CommonStack } from '../lib/clash-royale-proxy/common-stack'
import { ClashRoyaleProxyStack } from '../lib/clash-royale-proxy/clash-royale-proxy-stack'

// This grabs all our required environment variables, and ensures they are exist. Throws a error if its missing.
const envVars = getRuntimeEnvironmentVariables(RequiredEnvVars)

const env = { account: envVars.ACCOUNT, region: envVars.REGION };
const app = new App();

const commonStackConstruct = new CommonStack(app, 'ClashRoyaleProxyCommon', {
  stackName: 'clash-royale-proxy-stack-common',
  description: 'Resources shared across the Clash Royale Proxy app.',
  env
});

new ClashRoyaleProxyStack(app, commonStackConstruct, 'ClashRoyaleProxy', envVars, {
  stackName: `crash-royale-proxy-stack-${envVars.ENVIRONMENT}`,
  description: `Crash Royale Proxy app for stage: ${envVars.ENVIRONMENT}`,
  env
});
