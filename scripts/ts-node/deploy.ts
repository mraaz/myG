#!/usr/bin/env ts-node
import commandLineArgs from 'command-line-args'
import * as shell from 'async-shelljs'
import { promptForEnvironment, promptForInput, promptForRegion, promptForService } from './common'

const optionDefinitions = [
  { name: 'environment', alias: 'e', type: String },
  { name: 'service', alias: 's', type: String },
  { name: 'account', alias: 'a', type: String },
  { name: 'region', alias: 'r', type: String },
  { name: 'secret', alias: 'S', type: String },
  { name: 'token', alias: 't', type: String },
]

const destroyViaCdk = async (
  service: string,
  environment: string,
  account: string,
  region: string,
  secret: string,
  token: string
) => {
  await shell.cd(`./infastructure`)
  await shell.asyncExec(`npx cdk deploy ClashRoyaleProxyCommon ${service} --require-approval never`, {
    env: {
      ENVIRONMENT: environment,
      ACCOUNT: account,
      REGION: region,
      STAGE: environment,
      SECRET: secret,
      TOKEN: token
    }
  })
  await shell.cd('..')
}

const run = async () => {
  const options = commandLineArgs(optionDefinitions)
  const environment = (options.environment) ? options.environment : (await promptForEnvironment()).environment
  const service = (options.service) ? options.service : (await promptForService()).stack.stack
  
  let region = process.env.REGION
  if (!region) {
    region = options.region ? options.region : (await promptForRegion()).region
  }

  let account = process.env.ACCOUNT
  if (!account) {
    account = options.account ? options.account : (await promptForInput('account', 'Enter a AWS account number:')).account
  }

  let secret = process.env.SECRET
  if (!secret) {
    secret = options.secret ? options.secret : (await promptForInput('secret', 'Enter a secret for JWT token decrytion:')).secret
  }

  let token = process.env.TOKEN
  if (!token) {
    token = options.token ? options.token : (await promptForInput('token', 'Enter a Clash Royale API token:')).token
  }

  await destroyViaCdk(service, environment, account, region, secret, token)
}

if (!module.parent) {
  run().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
