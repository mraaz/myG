#!/usr/bin/env ts-node
import commandLineArgs from 'command-line-args'
import * as shell from 'async-shelljs'
import { promptForEnvironment, promptForService } from './common'

const optionDefinitions = [
  { name: 'environment', alias: 'e', type: String },
  { name: 'service', alias: 's', type: String }
]

const build = async(service: string) => {
  await shell.cd(`./services/${service}`)
  await shell.asyncExec(`npm run build`)
  await shell.cd('../..')
}

const run = async () => {
  const options = commandLineArgs(optionDefinitions)
  const environment = (options.environment) ? options.environment : (await promptForEnvironment()).environment
  const service = (options.service) ? options.service : (await promptForService()).stack.service
  await build(service)
}

if (!module.parent) {
  run().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
