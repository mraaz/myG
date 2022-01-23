const path = require('path');

export const getRuntimeEnvironmentVariables = <E extends any>(enumWithEnvVarNames: E, useLocalEnvFile: boolean = false): Record<keyof E, string> => {
  if (useLocalEnvFile) {
    require('dotenv').config({ path: path.resolve(__dirname, '../../../../../.env')})
  }

  const requiredEnvVars = getEnumKeys(enumWithEnvVarNames)

  const runtimeEnvVars = pick(requiredEnvVars, process.env)

  if (!validateEnvironment(runtimeEnvVars, requiredEnvVars)) {
    throw new Error('Missing required environment variable: ')
  }
  return runtimeEnvVars as any;
}

const getEnumKeys = (anyEnum: any) => Object.keys(anyEnum).filter(k => typeof anyEnum[k] === 'number')

const pick = <E extends any>(keys: string[], obj: any): Record<keyof E, string> => {
  const result: any = {}
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}

const validateEnvironment = (processEnv: any, requiredEnvVars: string[]): boolean => {
  const errors = requiredEnvVars.reduce((acc: any[], elem: string) => {
    if (processEnv[elem] === undefined || processEnv[elem] === '') {
      acc.push(elem)
    }
    return acc
  }, [])

  if (errors.length) {
    throw new Error(`Missing required environment variables: ${errors.join(', ')}`)
  }
  return true
}
