import express, { Request, Response } from 'express';
import axios from 'axios';

import { constructClashConfig, errorHandler, authenticateToken, getRuntimeEnvironmentVariables } from './common';

enum RequiredEnvVars {
  ENVIRONMENT,
  ENDPOINT,
  TOKEN,
}
// We do some magic here - when started via nodemon, it has the EnvVar LOCAL_DEV set in the package.json, telling this function
// load EnvVars from the root .env file. When run on a lambda, this is always unset, meaning it doesnt load the .env.
const env = getRuntimeEnvironmentVariables(RequiredEnvVars, !!process.env.LOCAL_DEV);

export const app = express();
const port = 3000;

app.get('/*', authenticateToken, async (req: Request, res: Response, next) => {
  try {
    const path = req.path;
    const tokens = env.TOKEN.split(':');

    if (!tokens.length) {
      throw new Error('Failed to split token: ' + env.TOKEN);
    }

    let config, response, latestError;
    for (const currentToken of tokens) {
      try {
        config = constructClashConfig(currentToken);
        response = await axios.get(`${env.ENDPOINT}${path}`, config);
      } catch (error) {
        config = null;
        response = null;
        console.error('Token Failed', currentToken);
        latestError = error;
      }
      if (response) {
        break;
      }
    }
    if (!response) {
      throw latestError;
    }

    res.send({
      data: response.data,
    });
  } catch (err) {
    errorHandler(err, req, res, next);
  }
});

app.listen(port, () => {
  console.log(
    `<<Clash Royale Proxy is running on port ${port} in ${env.ENVIRONMENT === 'development' ? `${'Local '}Development` : 'Production'}...`
  );
});
