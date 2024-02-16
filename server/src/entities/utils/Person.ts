import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Ensure that email is lowercased without whitespaces
  @BeforeInsert()
  @BeforeUpdate()
  convertToLowerCase() {
    if (this.email) {
      this.email = this.email.toLowerCase().trim();
    }
  }
}
