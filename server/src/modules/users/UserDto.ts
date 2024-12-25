export default class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  memberSince: Date;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    createdAt: Date
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${this.firstName} ${this.lastName}`;
    this.email = email;
    this.memberSince = createdAt;
  }
}
