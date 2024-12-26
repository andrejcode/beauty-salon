import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import type { Repository } from 'typeorm';
import { User } from '@/entities';
import {
  hashPassword,
  isStrongPassword,
  isValidEmail,
  jwtSign,
} from '@/utils/auth';
import type { Database } from '@/database';
import { mapUserToDto } from '@/utils/entityMappers';

export default (db: Database) => {
  const userRepo: Repository<User> = db.getRepository(User);

  async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRepo.findOne({
      select: {
        id: true,
        password: true,
        isAdmin: true,
      },
      where: { email },
    });

    if (!user) {
      res
        .status(401)
        .send('We could not find an account with this email address.');
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).send('Incorrect password. Try again.');
    } else {
      const token = jwtSign(user.id, user.isAdmin ? 'admin' : 'user');
      res.json({ token });
    }
  }

  async function signupUser(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    if (!isValidEmail(email)) {
      res.status(400).send('Invalid email address.');
      return;
    }

    if (!isStrongPassword(password)) {
      res.status(400).send('Weak password. Please choose a stronger password.');
      return;
    }

    const hash = await hashPassword(password);

    try {
      const user = await userRepo.save({
        firstName,
        lastName,
        email,
        password: hash,
      });

      const token = jwtSign(user.id, user.isAdmin ? 'admin' : 'user');

      res.json({ token });
    } catch (e) {
      if ((e as Error).message.includes('duplicate key')) {
        res.status(400).send('User with this email already exists.');
        return;
      }

      res.sendStatus(500);
    }
  }

  async function getUserProfile(req: Request, res: Response) {
    const { userId } = req;

    try {
      const user = await userRepo.findOne({ where: { id: userId } });

      if (!user) {
        res.send(404).send('User not found');
        return;
      }

      const userDto = mapUserToDto(user);
      res.json(userDto);
    } catch (e) {
      res.status(400).send('Unable to get user profile.');
    }
  }

  return { loginUser, signupUser, getUserProfile };
};
