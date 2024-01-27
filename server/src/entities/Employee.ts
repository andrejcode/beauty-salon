import { Column, Entity, OneToMany } from 'typeorm';
import { Person } from './utils/Person';
import { Appointment } from './Appointment';

@Entity()
export class Employee extends Person {
  @Column('text')
  description: string;

  @OneToMany(() => Appointment, (appointment) => appointment.employee)
  appointments: Appointment[];
}
