export default class EmployeeDto {
  id: number;

  firstName: string;

  lastName: string;

  fullName: string;

  email: string;

  description: string;

  breakStartTime: string;

  breakEndTime: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    description: string,
    breakStartTime: string,
    breakEndTime: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
    this.email = email;
    this.description = description;
    this.breakStartTime = breakStartTime;
    this.breakEndTime = breakEndTime;
  }
}
