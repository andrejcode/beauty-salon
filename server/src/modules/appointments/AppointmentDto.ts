import EmployeeDto from '../employees/EmployeeDto';
import UserDto from '../users/UserDto';

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
    user?: UserDto,
    employee?: EmployeeDto
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
      this.user = user;
    }

    if (employee) {
      this.employee = employee;
    }
  }
}
