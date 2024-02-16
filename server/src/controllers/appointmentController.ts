import { Request, Response } from 'express';
import { Database } from '../database';
import { Appointment } from '../entities';
import createAppointmentService from '../services/appointmentService';
import { isValidDateFormat, isValidTimeFormat } from '../utils/time';

export default (db: Database) => {
  const appointmentRepo = db.getRepository(Appointment);
  const appointmentService = createAppointmentService(appointmentRepo);

  async function getUserAppointments(req: Request, res: Response) {
    const { userId } = req;

    try {
      const appointments = await appointmentRepo.find({
        relations: { user: true },
        where: { userId },
      });

      res.json(appointments);
    } catch (e) {
      res.status(400).send('Unable to get appointments.');
    }
  }

  async function createAppointment(req: Request, res: Response) {
    const { userId } = req;
    const { date, time, duration, services, employeeId } = req.body;

    if (
      typeof date === 'string' &&
      typeof time === 'string' &&
      isValidDateFormat(date) &&
      isValidTimeFormat(time) &&
      typeof duration === 'number' &&
      typeof employeeId === 'number'
    )
      try {
        const availableTimes = await appointmentService.calculateAvailableTimes(
          employeeId,
          date,
          duration
        );

        if (availableTimes.includes(time)) {
          await appointmentRepo.save({
            date,
            time,
            duration,
            services,
            userId,
            employeeId,
          });

          res.status(201).send('Appointment successfully created.');
        } else {
          res.status(400).send('Time is not available.');
        }
      } catch (e) {
        res.status(400).send('Unable to create appointment.');
      }
  }

  async function getAvailableTimes(req: Request, res: Response) {
    const { employeeId, date, duration } = req.body;

    if (
      typeof employeeId === 'number' &&
      typeof date === 'string' &&
      isValidDateFormat(date) &&
      typeof duration === 'number'
    ) {
      try {
        const availableTimes = await appointmentService.calculateAvailableTimes(
          employeeId,
          date,
          duration
        );
        res.json(availableTimes);
      } catch (e) {
        res
          .status(400)
          .send(
            `Unable to get available times. ${(e as Error).message ? (e as Error).message : ''}`
          );
      }
    } else {
      res.status(400).send('Invalid payload.');
    }
  }

  return { getUserAppointments, createAppointment, getAvailableTimes };
};
