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
  { name: 'service', alias: 's', type: String }
]

const destroyViaCdk = async(
  environment: string,
  service: string,
  account: string,
  region: string,
  secret: string,
  token: string
) => {
  shell.env["ENVIRONMENT"] = environment
  shell.env["ACCOUNT"] = account
  shell.env["REGION"] = region
  shell.env["STAGE"] = environment
  shell.env["SECRET"] = secret
  shell.env["TOKEN"] = token

  await shell.cd(`./infastructure`)
  await shell.asyncExec(`npm run cdk -- destroy ${service} --exclusively --force never`)
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

  await destroyViaCdk(environment, service, account, region, secret, token)
}

if (!module.parent) {
  run().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
