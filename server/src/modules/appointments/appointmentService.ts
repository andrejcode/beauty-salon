import { Repository } from 'typeorm';
import { Appointment, Employee, BusinessTime } from '../../entities';
import {
  addMinutes,
  generateTimes,
  getDayNameFromNumber,
  isDateEqualOrGreater,
  isValidDateFormat,
} from '../../utils/time';

export default (
  appointmentRepo: Repository<Appointment>,
  employeeRepo: Repository<Employee>,
  businessTimesRepo: Repository<BusinessTime>
) => {
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

    const businessTimes = await businessTimesRepo.findOne({
      where: { id: 1 },
    });

    if (!businessTimes) {
      throw new Error('Unable to get business times.');
    }

    // Return empty array if non-working day
    if (businessTimes.offDays.includes(getDayNameFromNumber(day))) {
      return [];
    }

    const occupiedTimes = new Set<string>(); // Use Set to avoid duplicate times

    const employee = await employeeRepo.findOne({ where: { id: employeeId } });

    if (employee) {
      const employeeBreakStartTime = employee.breakStartTime;
      const employeeBreakEndTime = employee.breakEndTime;

      // Add time before employee break to occupied times
      // This is done to prevent appointment time to overlap
      // with the employee's scheduled break
      let currentDuration = duration;
      while (currentDuration > 0) {
        const timeToAdd = addMinutes(employeeBreakStartTime, -currentDuration);
        occupiedTimes.add(timeToAdd);
        currentDuration -= 15;
      }

      // Add employee break times to occupied times
      let currentBreakTime = employeeBreakStartTime;
      while (currentBreakTime < employeeBreakEndTime) {
        occupiedTimes.add(currentBreakTime);
        currentBreakTime = addMinutes(currentBreakTime, 15);
      }
    }

    const appointments = await appointmentRepo.find({
      where: { employeeId, date },
    });

    appointments.forEach((appointment) => {
      // Before and after each appointment there is 15 minutes gap
      // So the employee can prepare for next appointment
      const startTime = addMinutes(appointment.time, -15);
      const endTime = addMinutes(
        appointment.time,
        appointment.durationInMinutes
      );

      let currentTime = startTime;
      while (currentTime <= endTime) {
        occupiedTimes.add(currentTime);
        currentTime = addMinutes(currentTime, 15);
      }
    });

    // We are adding 15 minutes to the duration so that the employee
    // Can prepare everything before the end of the shift
    const businessEndTime = addMinutes(businessTimes.endTime, -(duration + 15));
    const generatedTimes = generateTimes(
      businessTimes.startTime,
      businessTimes.endTime
    );
    const availableTimes = generatedTimes.filter(
      (time) => time <= businessEndTime && !occupiedTimes.has(time)
    );

    return availableTimes;
  }

  return { calculateAvailableTimes };
};
