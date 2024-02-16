import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  name: string;

  @Column('int')
  duration: number; // Duration is in minutes

  @Column('text')
  description: string;

  @Column('int')
  cost: number; // Cost is in cents

  @Column('text')
  category: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  getCost(): string {
    return (this.cost / 100).toFixed(2);
  }

  // Ensure that category is lowercased to avoid name collision
  @BeforeInsert()
  @BeforeUpdate()
  convertToLowerCase() {
    if (this.category) {
      this.category = this.category.toLowerCase();
    }
  }
}
