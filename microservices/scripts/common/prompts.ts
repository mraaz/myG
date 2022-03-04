import * as fs from 'fs'
import * as inquirer from 'inquirer'
import * as shell from 'async-shelljs'

export const getDirectories = async (source: string) =>
  (await fs.promises.readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({ name: dirent.name, value: dirent.name }))

// Dont use
export const promptForMicroservice = async() => {
  const choices = await getDirectories('./services')
  return await inquirer.prompt<any>({
    type: 'list',
    name: 'service',
    choices,
    message: 'Choose a micoservice:'
  })
}

export const promptForService = async() => {
  const choices = [
    {
      name: 'Crash Royale',
      value: {
        stack: 'ClashRoyaleProxy',
        service: 'clash-royale-proxy'
      }
    },
    {
      name: 'JWT Service',
      value: {
        stack: 'JwtService',
        service: 'jwt-service'
      }
    },
  ]
  return await inquirer.prompt<any>({
    type: 'list',
    name: 'stack',
    choices,
    message: 'Choose a service:'
  })
}

export const promptForEnvironment = async() => {
  const choices = [
    {
      name: 'Development',
      value: 'development'
    },
    {
      name: 'Production',
      value: 'prod'
    }
  ]
  return await inquirer.prompt<any>({
    type: 'list',
    name: 'environment',
    choices,
    message: 'Choose a environment:'
  })
}

export const cdkSynth = async() => {
  await shell.cd(`./infastructure`)
  await shell.asyncExec(`npx cdk synth ClashRoyaleProxyCommon`, {
    env: {
      ACCOUNT: '457469627332',
      REGION: 'us-east-1',
      STAGE: 'development',
      SECRET: '67566B597033733676397924423F4528482B4D6251655468576D5A7134743777217A25432A46294A404E635266556A586E3272357538782F413F4428472B4B61',
      TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdkZWE2OWJkLTFhYzQtNDhmZi1hZmM0LWIyMGFlNGIyYjZlMiIsImlhdCI6MTYzNjk0Mjk1Nywic3ViIjoiZGV2ZWxvcGVyLzdmZjdkZTlmLTAxNTgtZWRhNi0yMWI3LThiNGFhZjczOTUwMSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIzNS4xNjkuMTc1LjcwIl0sInR5cGUiOiJjbGllbnQifV19.cNv9x5Us859ubpj9xNLgGmQmWfG_twPo7yWtUISB1WgCavdgOUb_V-Vn3E2uSj5We6YyepMJ3ixZt_MFrLruGw'
    }
  })
  await shell.cd('..')
}

export const promptForRegion = async() => {
  const choices = [
    {
      name: 'us-east-1',
      value: 'us-east-1'
    },
  ]
  return await inquirer.prompt<any>({
    type: 'list',
    name: 'region',
    choices,
    message: 'Choose a region:'
  })
}

export const promptForInput = async(name: string, message: string) => {
  return await inquirer.prompt<any>({
    type: 'input',
    name,
    message
  })
}
