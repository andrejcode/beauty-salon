import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import type { Repository } from 'typeorm';
import { User } from '../entities';
import { isStrongPassword, isValidEmail, jwtSign } from '../utils/auth';
import { Database } from '../database';

export default (db: Database) => {
  const userRepo: Repository<User> = db.getRepository(User);

  async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRepo.findOne({
      select: {
        id: true,
        password: true,
      },
      where: { email },
    });

    if (!user) {
      res
        .status(401)
        .send('We could not find an account with this email address.');
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).send('Incorrect password. Try again.');
      } else {
        const token = jwtSign(user.id);
        res.json({ token });
      }
    }
  }

  async function signupUser(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    if (!isValidEmail(email)) {
      res.status(400).send('Invalid email address.');
    } else if (!isStrongPassword(password)) {
      res.status(400).send('Weak password. Please choose a stronger password.');
    } else {
      const hash = await bcrypt.hash(password, 15);

      try {
        const user = await userRepo.save({
          firstName,
          lastName,
          email,
          password: hash,
        });

        const token = jwtSign(user.id);

        res.json({ token });
      } catch (e) {
        if ((e as Error).message.includes('duplicate key')) {
          res.status(400).send('User with this email already exists.');
        } else {
          res.sendStatus(500);
        }
      }
    }
  }

  async function getUserProfile(req: Request, res: Response) {
    const { userId } = req;

    try {
      const user = await userRepo.findOne({
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
        where: { id: userId },
      });

      res.json(user);
    } catch (e) {
      res.status(404).send('User not found.');
    }
  }

  return { loginUser, signupUser, getUserProfile };
};
