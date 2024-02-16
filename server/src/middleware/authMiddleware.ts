import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import config from '../config';

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
  } else {
    jwt.verify(
      token,
      config.tokenKey,
      (err: VerifyErrors | null, payload: string | JwtPayload | undefined) => {
        if (payload && typeof payload !== 'string') {
          req.userId = payload.id;
          next();
        } else {
          if (err?.message === 'jwt expired') {
            res.status(401).send('Token expired.');
          }

          res.sendStatus(401);
        }
      }
    );
  }
}
