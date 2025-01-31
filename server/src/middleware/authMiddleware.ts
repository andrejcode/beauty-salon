import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload, type VerifyErrors } from 'jsonwebtoken';
import config from '../config';
import { type Database } from '../database';
import { User } from '../entities';

export function authenticateToken(
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

export function isAdmin(db: Database) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req;

    const userRepo = db.getRepository(User);

    const user = await userRepo.findOne({
      where: { id: userId },
      select: { isAdmin: true },
    });

    if (user && user.isAdmin) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
}
