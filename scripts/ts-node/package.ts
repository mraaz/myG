import commandLineArgs from 'command-line-args'
import * as shell from 'async-shelljs'
import { promptForEnvironment, promptForService } from './common'

const optionDefinitions = [
  { name: 'environment', alias: 'e', type: String },
  { name: 'service', alias: 's', type: String }
]

const packageFolder = async(service: string) => {
  // Delete and re-create folder
  await shell.rm('-rf', `./services/${service}/dist`)
  await shell.mkdir(`./services/${service}/dist`)

  // Copy required files
  await shell.cp('-r', `./services/${service}/build`, `./services/${service}/dist/build`)
  await shell.cp('-r', `./services/${service}/package.json`, `./services/${service}/dist/package.json`)
  await shell.cp('-r', `./services/${service}/package-lock.json`, `./services/${service}/dist/package-lock.json`)

  // Install prod only node modules
  await shell.cd(`./services/${service}/dist`)
  await shell.asyncExec(`npm install --only=prod`)
  await shell.cd('../../..')
}

const run = async () => {
  const options = commandLineArgs(optionDefinitions)
  const environment = (options.environment) ? options.environment : (await promptForEnvironment()).environment
  const service = (options.service) ? options.service : (await promptForService()).stack.service
  await packageFolder(service)
}

if (!module.parent) {
  run().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
