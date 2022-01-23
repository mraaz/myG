#!/usr/bin/env ts-node
import commandLineArgs from 'command-line-args'
import * as shell from 'async-shelljs'
import { promptForEnvironment, promptForService, getRuntimeEnvironmentVariables } from './common'

enum RequiredEnvVars {
  REGION,
  ACCOUNT,
  SECRET,
  TOKEN
}

const env = getRuntimeEnvironmentVariables(RequiredEnvVars, true)

const optionDefinitions = [
  { name: 'environment', alias: 'e', type: String },
  { name: 'service', alias: 's', type: String },
  { name: 'account', alias: 'a', type: String },
  { name: 'region', alias: 'r', type: String },
  { name: 'secret', alias: 'S', type: String },
  { name: 'token', alias: 't', type: String },
]

/**
 * Deploys the specified service, along with the common stack. Takes all environment variables and resets them for the runtime. Does this so that if any commandLineArgs are set they override the set EnvVars.
 */
const deployViaCdk = async (
  environment: string,
  service: string,
  account: string,
  region: string,
  secret: string,
  token: string
) => {
  await shell.cd(`./infastructure`)
  await shell.asyncExec(`npm run cdk -- synth`, {
    env: {
      ENVIRONMENT: environment,
      ACCOUNT: account,
      REGION: region,
      STAGE: environment,
      SECRET: secret,
      TOKEN: token
    }
  })
  // await shell.asyncExec(`npm run cdk -- deploy ClashRoyaleProxyCommon ${service} --require-approval never`, {
  //   env: {
  //     ENVIRONMENT: environment,
  //     ACCOUNT: account,
  //     REGION: region,
  //     STAGE: environment,
  //     SECRET: secret,
  //     TOKEN: token
  //   }
  // })
  await shell.cd('..')
}

const run = async () => {
  const options = commandLineArgs(optionDefinitions)

  // Basic prompt - checks input flag first. Fallback is user prompt. NO taking input from env variable.
  const environment = (options.environment) ? options.environment : (await promptForEnvironment()).environment
  const service = (options.service) ? options.service : (await promptForService()).stack.stack
  
  // Advanced prompt - checks input flag first, followed by env variable. No Fallback to prompt.
  const account = options.account ? options.account as string : env.ACCOUNT
  const region = options.region ? options.region as string : env.REGION
  const secret = options.secret ? options.secret as string : env.SECRET
  const token = options.token ? options.token as string : env.TOKEN

  await deployViaCdk(environment, service, account, region, secret, token)
}

if (!module.parent) {
  run().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
