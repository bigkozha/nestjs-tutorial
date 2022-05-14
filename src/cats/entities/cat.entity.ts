import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CatFood } from './catFood.entity';

@Entity({ name: 'cats' })
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @ManyToMany(() => CatFood, (catFood) => catFood.cats)
  catFoods: CatFood[];
}
