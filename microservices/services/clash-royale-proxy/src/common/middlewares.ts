import { Request, Response, NextFunction } from 'express';

/**
 * A custom authentication middleware which checks that the bearer token is valid
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  if (token !== (process.env.SECRET as string)) {
    return res.sendStatus(401);
  }

  next();
};
