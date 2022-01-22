#!/usr/bin/env ts-node
import * as shell from 'async-shelljs'
import * as inquirer from 'inquirer'
import * as fs from 'fs'
import chalk from 'chalk'
import { promptForEnvironment, promptForMicroservice, promptForStack } from './common'

const introduction = async() => {
  console.log(chalk.black.bgYellowBright(' Microservice Helper '))
  console.log(chalk.greenBright.bold('This script will help you build and deploy myG microservices'))
}

const build = async(service: string) => {
  await shell.cd(`./services/${service}`)
  await shell.asyncExec(`npm run build`)
  await shell.cd('../..')
}

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

const deployViaCdk = async(stack: string, env: string) => {
  await shell.cd(`./infastructure`)
  await shell.asyncExec(`npx cdk deploy ClashRoyaleProxyCommon ${stack} --require-approval never`, {
    env: {
      ACCOUNT: '457469627332',
      REGION: 'us-east-1',
      STAGE: env,
      SECRET: '67566B597033733676397924423F4528482B4D6251655468576D5A7134743777217A25432A46294A404E635266556A586E3272357538782F413F4428472B4B61',
      TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdkZWE2OWJkLTFhYzQtNDhmZi1hZmM0LWIyMGFlNGIyYjZlMiIsImlhdCI6MTYzNjk0Mjk1Nywic3ViIjoiZGV2ZWxvcGVyLzdmZjdkZTlmLTAxNTgtZWRhNi0yMWI3LThiNGFhZjczOTUwMSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIzNS4xNjkuMTc1LjcwIl0sInR5cGUiOiJjbGllbnQifV19.cNv9x5Us859ubpj9xNLgGmQmWfG_twPo7yWtUISB1WgCavdgOUb_V-Vn3E2uSj5We6YyepMJ3ixZt_MFrLruGw'
    }
  })
  await shell.cd('..')
}

const run = async () => {
  await introduction()

  const selectedStack = await promptForStack()

  if (selectedStack.stack === 'core-services-stack') {
    await deployViaCdk(selectedStack.stack, 'shared')
    return
  }

  const selectedService = await promptForMicroservice()
  const selectedEnv = await promptForEnvironment()
  await build(selectedService.service)
  await packageFolder(selectedService.service)
  await deployViaCdk(selectedStack.stack, selectedEnv.environment)
}

if (!module.parent) {
  run().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}