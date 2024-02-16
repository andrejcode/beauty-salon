import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Person } from './utils/Person';
import { Review } from './Review';
import { Appointment } from './Appointment';

@Entity()
export class User extends Person {
  @Column('text', { select: false })
  password: string;

  @OneToOne(() => Review, (review) => review.user)
  review: Review;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
