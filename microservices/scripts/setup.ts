import * as shell from 'async-shelljs'
import chalk from 'chalk'
import { getDirectories } from './common'

const installInfastructure = async () => {
  console.log(chalk.yellow(`Installing AWS CDK node_modules...`))
  await shell.cd(`./infastructure`)
  await shell.asyncExec(`npm install`)
  await shell.cd('..')
}

const installService = async (service: string) => {
  await shell.cd(`./services/${service}`)
  await shell.asyncExec(`npm install`)
  await shell.cd('../..')
}

const run = async () => {
  console.log(chalk.greenBright.bold('Installing all microservice dependencies...'))
  const dirs = await getDirectories('./services')
  await installInfastructure()
  for(const service of dirs) {
    console.log(chalk.yellow(`Installing ${service.name} node_modules...`))
    await installService(service.value)
  }
  console.log(chalk.greenBright.bold('Microservice dependencies installed!'))
}

if (!module.parent) {
  run().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
