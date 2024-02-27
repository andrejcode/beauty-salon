import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BusinessTime {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('time without time zone')
  startTime: string;

  @Column('time without time zone')
  endTime: string;

  @Column({ type: 'simple-array', default: ['Saturday', 'Sunday'] })
  offDays: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
