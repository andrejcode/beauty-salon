import { Appointment, Employee, User } from '../../entities';
import EmployeeDto, { mapEmployeeToDto } from '../employees/EmployeeDto';
import UserDto, { mapUserToDto } from '../users/UserDto';

export default class AppointmentDto {
  id: number;

  date: string;

  time: string;

  durationInMinutes: number;

  priceInCents: number;

  services: string[];

  userId: number;

  user?: UserDto;

  employeeId: number;

  employee?: EmployeeDto;

  constructor(
    id: number,
    date: string,
    time: string,
    durationInMinutes: number,
    priceInCents: number,
    services: string[],
    userId: number,
    employeeId: number,
    user?: User,
    employee?: Employee
  ) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.durationInMinutes = durationInMinutes;
    this.priceInCents = priceInCents;
    this.services = services;
    this.userId = userId;
    this.employeeId = employeeId;

    if (user) {
      this.user = mapUserToDto(user);
    }

    if (employee) {
      this.employee = mapEmployeeToDto(employee);
    }
  }
}

export function mapAppointmentToDto(appointment: Appointment): AppointmentDto {
  const {
    id,
    date,
    time,
    durationInMinutes,
    priceInCents,
    services,
    userId,
    employeeId,
    user,
    employee,
  } = appointment;
  return new AppointmentDto(
    id,
    date,
    time,
    durationInMinutes,
    priceInCents,
    services,
    userId,
    employeeId,
    user,
    employee
  );
}
