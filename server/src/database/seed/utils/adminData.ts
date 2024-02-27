import bcrypt from 'bcrypt';
import { User } from '../../../entities';
import config from '../../../config';

async function hashPassword(password: string) {
  const encryptedPassword = await bcrypt.hash(password, 15);
  return encryptedPassword;
}

const adminData = async () => {
  const password = await hashPassword(config.adminPassword);

  const data: Pick<
    User,
    'id' | 'firstName' | 'lastName' | 'email' | 'password' | 'isAdmin'
  >[] = [
    {
      id: 1,
      firstName: 'admin',
      lastName: 'admin',
      email: config.adminEmail,
      password,
      isAdmin: true,
    },
  ];

  return data;
};

export default adminData;
