import express, { Request, Response } from 'express';
import axios from 'axios';

import { constructClashConfig, errorHandler, authenticateToken, getRuntimeEnvironmentVariables } from './common';

enum RequiredEnvVars {
  ENVIRONMENT,
  ENDPOINT,
  TOKEN
}
// We do some magic here - when started via nodemon, it has the EnvVar LOCAL_DEV set in the package.json, telling this function
// load EnvVars from the root .env file. When run on a lambda, this is always unset, meaning it doesnt load the .env. 
const env = getRuntimeEnvironmentVariables(RequiredEnvVars, !!process.env.LOCAL_DEV)

export const app = express();
const port = 3000;

app.get('/*', authenticateToken, async (req: Request, res: Response, next) => {
  try {
    const path = req.path;

    const config = constructClashConfig(env.TOKEN);

    const response = await axios.get(`${env.ENDPOINT}${path}`, config);

    res.send({
      data: response.data,
    });
  } catch (err) {
    errorHandler(err, req, res, next);
  }
});

app.listen(port, () => {
  console.log(`Clash Royale Proxy is running on port ${port} in ${env.ENVIRONMENT === 'development' ? `${'Local '}Development` : 'Production'}...`);
});
