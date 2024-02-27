import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Service } from '../../entities';
import { Database } from '../../database';

export default (db: Database) => {
  const serviceRepo: Repository<Service> = db.getRepository(Service);

  async function getServices(_req: Request, res: Response) {
    try {
      const services = await serviceRepo.find();

      res.json(services);
    } catch (e) {
      res.status(400).send('Unable to get services.');
    }
  }

  return { getServices };
};
