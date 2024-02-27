import { Column, Entity, OneToMany } from 'typeorm';
import { Person } from './utils/Person';
import { Appointment } from './Appointment';

@Entity()
export class Employee extends Person {
  @Column('text')
  description: string;

  @Column('time without time zone')
  breakStartTime: string;

  @Column('time without time zone')
  breakEndTime: string;

  @OneToMany(() => Appointment, (appointment) => appointment.employee)
  appointments: Appointment[];
}
