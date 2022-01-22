import express, { Request, Response } from 'express';
import { constructClashConfig, getTokens, getEndpoint, Token, errorHandler, authenticateToken } from './common';
import axios from 'axios';

require('dotenv').config();

export const app = express();
const port = 3000;

app.get('/*', authenticateToken, async (req: Request, res: Response, next) => {
  try {
    const endpoint = getEndpoint();
    const token = getTokens();
    const path = req.path;

    if (token === Token.NoToken) {
      throw new Error(Token.NoToken);
    }

    if (endpoint === Token.NoEndpoint) {
      throw new Error(Token.NoEndpoint);
    }

    const config = constructClashConfig(token);

    const response = await axios.get(`${endpoint}${path}`, config);

    res.send({
      data: response.data,
    });
  } catch (err) {
    errorHandler(err, req, res, next);
  }
});

app.listen(port, () => {
  console.log(`Clash Proxy is running on port ${port} in ${process.env.ENVIRONMENT === 'dev' ? 'Local Development' : 'Production'}.`);
});
