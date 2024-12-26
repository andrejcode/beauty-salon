import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { Response } from 'express';
import { type FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../entities';
import config from '../config';

export function jwtSign(id: User['id'], role: string) {
  return jwt.sign({ id, role }, config.tokenKey, {
    expiresIn: '7d',
  });
}

export async function hashPassword(password: string) {
  const encryptedPassword = await bcrypt.hash(password, 15);
  return encryptedPassword;
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isStrongPassword(password: string) {
  // Password must be at least 8 chars long
  // And have lower and upper cased letter and a digit
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);

  return (
    password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit
  );
}

interface Entity {
  id: number;
  userId: number;
}

// Check if the user is the owner of the entity (review or appointment)
export async function performActionIfOwner<T extends Entity>(
  res: Response,
  userId: number,
  entityId: number,
  entityRepo: Repository<T>,
  actionIfOwner: () => Promise<void>
) {
  const entity = await entityRepo.findOne({
    where: { id: entityId } as FindOptionsWhere<T>,
  });

  try {
    if (!entity) {
      res.status(404).send('Entity not found.');
      return;
    }

    if (entity.userId !== userId) {
      res.status(403).send('User is not the owner of the entity.');
      return;
    }

    await actionIfOwner();
  } catch (e) {
    res.sendStatus(500);
  }
}
