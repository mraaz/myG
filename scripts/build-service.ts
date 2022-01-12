#!/usr/bin/env ts-node
import * as shell from 'async-shelljs'
import * as inquirer from 'inquirer'
import * as fs from 'fs'
import chalk from 'chalk'

const introduction = async() => {
  console.log(chalk.black.bgYellowBright(' Microservice Helper '))
  console.log(chalk.greenBright.bold('This script will help you build and deploy myG microservices'))
}

const getDirectories = async source =>
  (await fs.promises.readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({ name: dirent.name, value: dirent.name }))

const prompt = async() => {
  const choices = await getDirectories('./services')
  return await inquirer.prompt<any>({
    type: 'list',
    name: 'service',
    choices,
    message: 'Choose a micoservice:'
  })
}

const build = async(service: string) => {
  await shell.cd(`./services/${service}`)
  await shell.asyncExec(`npm run build`)
  await shell.cd('../..')
}

const packageFolder = async(service: string) => {
  await shell.rm('-rf', `./services/${service}/dist`)
  await shell.mkdir(`./services/${service}/dist`)
  await shell.cp('-r', `./services/${service}/build`, `./services/${service}/dist/build`)
  await shell.cp('-r', `./services/${service}/node_modules`, `./services/${service}/dist/node_modules`)
}

const deployViaCdk = async(service: string) => {
  await shell.cd(`./infastructure`)
  await shell.asyncExec(`npm run cdk:deploy`)
  await shell.cd('..')
}

const run = async () => {
  await introduction()

  const selected = await prompt()
  await build(selected.service)
  await packageFolder(selected.service)
  await deployViaCdk(selected.service)
}

if (!module.parent) {
  run().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}