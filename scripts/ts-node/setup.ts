import commandLineArgs from 'command-line-args'
import * as shell from 'async-shelljs'
import { promptForService } from './common'

const optionDefinitions = [
  { name: 'service', alias: 's', type: String }
]

const installInfastructure = async () => {
  await shell.cd(`./infastructure`)
  await shell.asyncExec(`npm install`)
  await shell.cd('..')
}

const installService = async (service: string) => {
  await shell.cd(`./services/${service}`)
  await shell.asyncExec(`npm install`)
  await shell.cd('../..')
}

const installRoot = async () => {
  await shell.asyncExec(`npm install`)
}

const run = async () => {
  const options = commandLineArgs(optionDefinitions)
  const service = (options.service) ? options.service : (await promptForService()).stack.service
  await installRoot()
  await installInfastructure()
  await installService(service)
}

if (!module.parent) {
  run().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
