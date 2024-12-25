import type { Request, Response } from 'express';
import { MoreThanOrEqual } from 'typeorm';
import type { Database } from '@/database';
import { Appointment, Employee, Service, BusinessTime } from '@/entities';
import createAppointmentService from './appointmentService';
import { formatDate, isValidDateFormat, isValidTimeFormat } from '@/utils/time';
import { performActionIfOwner } from '@/utils/auth';
import { mapAppointmentToDto } from '@/utils/entityMappers';

interface RequestQuery {
  employeeId?: string;
  date?: string;
  duration?: string;
}

export default (db: Database) => {
  const appointmentRepo = db.getRepository(Appointment);
  const employeeRepo = db.getRepository(Employee);
  const businessTimeRepo = db.getRepository(BusinessTime);
  const appointmentService = createAppointmentService(
    appointmentRepo,
    employeeRepo,
    businessTimeRepo
  );
  const serviceRepo = db.getRepository(Service);

  async function getUpcomingAppointment(_req: Request, res: Response) {
    try {
      const currentDate = new Date();
      const formattedCurrentDate = formatDate(currentDate);

      const upcomingAppointments = await appointmentRepo.find({
        relations: { user: true, employee: true },
        order: { date: 'ASC' },
        where: { date: MoreThanOrEqual(formattedCurrentDate) },
      });

      const appointmentsDto = upcomingAppointments.map((appointment) =>
        mapAppointmentToDto(appointment)
      );

      res.json(appointmentsDto);
    } catch (e) {
      res
        .status(400)
        .send(
          `Unable to get upcoming appointments. ${(e as Error).message ? (e as Error).message : ''}`
        );
    }
  }

  async function getUserAppointments(req: Request, res: Response) {
    const { userId } = req;

    try {
      const appointments = await appointmentRepo.find({
        where: { userId },
        order: { date: 'ASC' },
      });

      const appointmentsDto = appointments.map((appointment) =>
        mapAppointmentToDto(appointment)
      );

      res.json(appointmentsDto);
    } catch (e) {
      res
        .status(400)
        .send(
          `Unable to get appointments. ${(e as Error).message ? (e as Error).message : ''}`
        );
    }
  }

  async function createAppointment(req: Request, res: Response) {
    const { userId } = req;
    const { date, time, duration, services, employeeId } = req.body;

    if (
      typeof date !== 'string' ||
      typeof time !== 'string' ||
      !isValidDateFormat(date) ||
      !isValidTimeFormat(time) ||
      typeof duration !== 'number' ||
      typeof employeeId !== 'number'
    ) {
      res.status(400).send('Invalid payload.');
      return;
    }

    try {
      const availableTimes = await appointmentService.calculateAvailableTimes(
        employeeId,
        date,
        duration
      );

      if (!availableTimes.includes(time)) {
        res.status(400).send('Time is not available.');
        return;
      }

      // Extra step to calculate total price so it cannot be tampered with
      let totalPrice = 0;
      await Promise.all(
        services.map(async (serviceName: string) => {
          const service = await serviceRepo.findOne({
            where: { name: serviceName },
          });

          if (service) {
            totalPrice += service.costInCents;
          }
        })
      );

      await appointmentRepo.save({
        date,
        time,
        durationInMinutes: duration,
        priceInCents: totalPrice,
        services,
        userId,
        employeeId,
      });

      res.status(201).send('Appointment successfully created.');
    } catch (e) {
      res
        .status(400)
        .send(
          `Unable to create appointment. ${(e as Error).message ? (e as Error).message : ''}`
        );
    }
  }

  async function deleteAppointment(req: Request, res: Response) {
    const { userId } = req;
    const id = parseInt(req.params.id, 10);

    if (!id || typeof id !== 'number') {
      res.status(400).send('Invalid id parameter.');
      return;
    }

    await performActionIfOwner(res, userId!, id, appointmentRepo, async () => {
      await appointmentRepo.delete({ id });
      res.status(200).send('Appointment deleted successfully.');
    });
  }

  async function getAvailableTimes(req: Request, res: Response) {
    const { employeeId, date, duration }: RequestQuery = req.query;

    const employeeIdValue = !Number.isNaN(parseInt(employeeId!, 10))
      ? parseInt(employeeId!, 10)
      : null;
    const durationValue = !Number.isNaN(parseInt(duration!, 10))
      ? parseInt(duration!, 10)
      : null;

    if (
      typeof employeeIdValue !== 'number' ||
      typeof date !== 'string' ||
      !isValidDateFormat(date) ||
      typeof durationValue !== 'number'
    ) {
      res.status(400).send('Invalid payload.');
      return;
    }

    try {
      const availableTimes = await appointmentService.calculateAvailableTimes(
        employeeIdValue,
        date,
        durationValue
      );
      res.json(availableTimes);
    } catch (e) {
      res
        .status(400)
        .send(
          `Unable to get available times. ${(e as Error).message ? (e as Error).message : ''}`
        );
    }
  }

  return {
    getUpcomingAppointment,
    getUserAppointments,
    createAppointment,
    deleteAppointment,
    getAvailableTimes,
  };
};
