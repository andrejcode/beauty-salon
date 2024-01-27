import { Column, CreateDateColumn, Entity, OneToMany, OneToOne } from 'typeorm';
import { Person } from './utils/Person';
import { Review } from './Review';
import { Appointment } from './Appointment';

@Entity()
export class User extends Person {
  @Column('text', { select: false })
  password: string;

  @CreateDateColumn()
  memberSince: Date;

  @OneToOne(() => Review, (review) => review.user)
  review: Review;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}

export type AuthUser = Pick<User, 'id'>;
