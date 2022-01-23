#!/usr/bin/env ts-node
import commandLineArgs from 'command-line-args'
import * as shell from 'async-shelljs'
import { promptForEnvironment, promptForService } from './common'

const optionDefinitions = [
  { name: 'environment', alias: 'e', type: String },
  { name: 'service', alias: 's', type: String }
]

const destroyViaCdk = async(stack: string, env: string) => {
  await shell.cd(`./infastructure`)
  await shell.asyncExec(`npx cdk destroy ${stack} --exclusively --force never`, {
    env: {
      ENVIRONMENT: env
    }
  })
  await shell.cd('..')
}

const run = async () => {
  const options = commandLineArgs(optionDefinitions)
  const environment = (options.environment) ? options.environment : (await promptForEnvironment()).environment
  const service = (options.service) ? options.service : (await promptForService()).stack.service
  await destroyViaCdk(service, environment)
}

if (!module.parent) {
  run().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
