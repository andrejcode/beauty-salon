import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  reviewText: string;

  @Column('int')
  stars: number; // Number between 1 and 5

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('integer')
  userId: number;

  @OneToOne(() => User, (user) => user.review, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
