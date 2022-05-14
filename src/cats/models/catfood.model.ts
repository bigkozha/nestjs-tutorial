import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Cat } from '../models/cat.model';

@ObjectType()
export class CatFood {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => [Cat])
  cats: Cat[];
}
