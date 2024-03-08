import { Request, Response } from 'express';
import { Database } from '../../database';
import { BusinessTime } from '../../entities';
import { mapBusinessTimeToDto } from '../../utils/entityMappers';

export default (db: Database) => {
  const businessTimeRepo = db.getRepository(BusinessTime);

  async function getBusinessTime(_req: Request, res: Response) {
    try {
      const businessTime = await businessTimeRepo.findOne({
        where: { id: 1 },
      });

      if (!businessTime) {
        res.status(404).send('Business time not found.');
        return;
      }

      const businessTimeDto = mapBusinessTimeToDto(businessTime);
      res.json(businessTimeDto);
    } catch (e) {
      res
        .status(400)
        .send(
          `Unable to get business times. ${(e as Error).message ? (e as Error).message : ''}`
        );
    }
  }

  return { getBusinessTime };
};
