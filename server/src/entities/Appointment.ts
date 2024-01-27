import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Employee } from './Employee';

@Entity()
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('timestamp with time zone')
  date: Date;

  @Column('int')
  duration: number; // Duration is in minutes

  @Column({ type: 'simple-array', default: [] })
  services: string[];

  @ManyToOne(() => User, (user) => user.appointments, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  // If the employee is deleted we will set it to null
  // We will add logic to replace the employee if it is deleted
  @ManyToOne(() => Employee, (employee) => employee.appointments, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  employee: Employee;
}
