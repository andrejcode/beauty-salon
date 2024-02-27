import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Employee } from './Employee';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('date')
  date: string;

  @Column('time without time zone')
  time: string;

  @Column('int')
  durationInMinutes: number;

  @Column('int')
  priceInCents: number;

  @Column({ type: 'simple-array', default: [] })
  services: string[];

  @CreateDateColumn()
  createdAt: Date;

  @Column('integer')
  userId: number;

  @ManyToOne(() => User, (user) => user.appointments, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column('integer')
  employeeId: number;

  // If the employee is deleted we will set it to null
  // We will add logic to replace the employee if it is deleted
  @ManyToOne(() => Employee, (employee) => employee.appointments, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  employee: Employee;
}
