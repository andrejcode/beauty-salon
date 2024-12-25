import { Column, Entity, OneToMany } from 'typeorm';
import { Person } from './utils/Person';
import { Appointment } from './Appointment';

@Entity()
export class User extends Person {
  @Column('text', { select: false })
  password: string;

  @Column('boolean', { default: false, select: false })
  isAdmin: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
