import { Repository } from 'typeorm';
import { Appointment, Employee, BusinessTime } from '@/entities';
import {
  addMinutes,
  generateTimes,
  getCurrentTimeAsString,
  getDayNameFromNumber,
  isDateTodayOrLater,
  isDateToday,
  formatDate,
  isValidDateFormat,
  isDateLessThanOneYearFromNow,
} from '@/utils/time';

export default (
  appointmentRepo: Repository<Appointment>,
  employeeRepo: Repository<Employee>,
  businessTimesRepo: Repository<BusinessTime>
) => {
  async function calculateAvailableTimes(
    employeeId: number,
    dateString: string,
    duration: number
  ): Promise<string[]> {
    if (typeof duration !== 'number' || duration <= 0) {
      throw new Error('Invalid duration.');
    }

    if (typeof employeeId !== 'number' || employeeId <= 0) {
      throw new Error('Invalid employee id.');
    }

    if (typeof dateString !== 'string' || !isValidDateFormat(dateString)) {
      throw new Error('Invalid date.');
    }

    const date = new Date(dateString);

    if (!isDateTodayOrLater(date)) {
      throw new Error('Date must be greater then or equal to todays date.');
    }

    if (!isDateLessThanOneYearFromNow(date)) {
      throw new Error('Date must be less than one year from now.');
    }

    const businessTimes = await businessTimesRepo.findOne({
      where: { id: 1 },
    });

    if (!businessTimes) {
      throw new Error('Unable to get business times.');
    }

    const day = date.getDay();
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
    } else {
      throw new Error('Employee not found.');
    }

    const appointments = await appointmentRepo.find({
      where: { employeeId, date: formatDate(date) },
    });

    appointments.forEach((appointment) => {
      // Before and after each appointment there is 15 minutes gap
      // So the employee can prepare for next appointment
      const startTime = addMinutes(appointment.time, -duration);
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

    // We don't want user to be able to pick times before now
    const timeNow = getCurrentTimeAsString();

    const availableTimes = generatedTimes.filter(
      (time) =>
        time <= businessEndTime &&
        !occupiedTimes.has(time) &&
        (isDateToday(date) ? time > timeNow : true)
    );

    return availableTimes;
  }

  return { calculateAvailableTimes };
};
