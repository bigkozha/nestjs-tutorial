import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Cat } from './cat.entity';

@Entity({ name: 'catFoods' })
export class CatFood {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Cat, (cat) => cat.catFoods)
  @JoinTable()
  cats: Cat[];
}
