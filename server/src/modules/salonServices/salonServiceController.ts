import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Service } from '../../entities';
import { Database } from '../../database';
import SalonServiceDto from './SalonServiceDto';
import { mapServiceToDto } from '../../utils/entityMappers';

export default (db: Database) => {
  const serviceRepo: Repository<Service> = db.getRepository(Service);

  async function getServices(_req: Request, res: Response) {
    try {
      const services = await serviceRepo.find();
      const servicesDto: SalonServiceDto[] = services.map((service) =>
        mapServiceToDto(service)
      );
      res.json(servicesDto);
    } catch (e) {
      res.status(400).send('Unable to get services.');
    }
  }

  return { getServices };
};
