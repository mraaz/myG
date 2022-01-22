import { Request, Response, NextFunction } from 'express';
import jwt  from 'jsonwebtoken'

/**
 * A custom authentication middleware which checks that the bearer token is valid
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET as string, { audience: 'myG_webserver' }, (err: any, user: any) => {
    if (err) {
      console.error('error: ', err)
      return res.sendStatus(403);
    }

    console.log('token', user)
    next()
  })

}