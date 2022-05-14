import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CatFood } from '../models/catfood.model';

@ObjectType()
export class Cat {
  @Field((t) => String, { nullable: true })
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  age: number;

  @Field((type) => String)
  breed: string;

  @Field((type) => [CatFood])
  catFoods: CatFood[];
}
