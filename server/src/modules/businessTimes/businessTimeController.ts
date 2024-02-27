import { Request, Response } from 'express';
import { Database } from '../../database';
import { BusinessTime } from '../../entities';

export default (db: Database) => {
  const businessTimeRepo = db.getRepository(BusinessTime);

  async function getBusinessTime(req: Request, res: Response) {
    try {
      const businessTimes = await businessTimeRepo.findOne({
        where: { id: 1 },
      });
      res.json(businessTimes);
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
