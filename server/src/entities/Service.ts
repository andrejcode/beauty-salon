import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  name: string;

  @Column('int')
  duration: number; // Duration is in minutes

  @Column('text')
  description: string;

  @Column('money')
  cost: number;

  @Column('text')
  category: string;

  // Ensure that category is lowercased to avoid name collision
  @BeforeInsert()
  @BeforeUpdate()
  convertToLowerCase() {
    if (this.category) {
      this.category = this.category.toLowerCase();
    }
  }
}
