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
  durationInMinutes: number;

  @Column('text')
  description: string;

  @Column('int')
  costInCents: number;

  @Column('text')
  category: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Ensure that category is lowercased to avoid name collision
  @BeforeInsert()
  @BeforeUpdate()
  convertToLowerCase() {
    if (this.category) {
      this.category = this.category.toLowerCase();
    }
  }
}
