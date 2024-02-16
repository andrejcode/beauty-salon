import { Repository } from 'typeorm';
import { Appointment } from '../entities';
import {
  addMinutes,
  generateTimes,
  isDateEqualOrGreater,
  isValidDateFormat,
} from '../utils/time';

export default (appointmentRepo: Repository<Appointment>) => {
  async function calculateAvailableTimes(
    employeeId: number,
    date: string,
    duration: number
  ): Promise<string[]> {
    if (!isValidDateFormat(date) || typeof date !== 'string') {
      throw new Error('Invalid date.');
    }

    const newDate = new Date(date);
    const today = new Date();

    if (!isDateEqualOrGreater(newDate, today)) {
      throw new Error('Date must be greater then or equal to todays date.');
    }

    const day = newDate.getDay();

    // Salon does not work on Saturday and Sunday
    if (day === 0 || day === 6) {
      return [];
    }

    const appointments = await appointmentRepo.find({
      where: { employeeId, date },
    });

    const occupiedTimes = new Set<string>();
    appointments.forEach((appointment) => {
      // Before and after each appointment there is 15 minutes gap
      // So the employee can prepare for next appointment
      const startTime = addMinutes(appointment.time, -duration);
      const endTime = addMinutes(appointment.time, appointment.duration);

      let currTime = startTime;
      while (currTime <= endTime) {
        occupiedTimes.add(currTime);
        currTime = addMinutes(currTime, 15);
      }
    });

    // We are adding 15 minutes to the duration so that the employee
    // Can prepare everything before the end of the shift
    const businessEndTime = addMinutes('18:00:00', -(duration + 15));
    const generatedTimes = generateTimes();
    const availableTimes = generatedTimes.filter(
      (time) => time <= businessEndTime && !occupiedTimes.has(time)
    );

    return availableTimes;
  }

  return { calculateAvailableTimes };
};
