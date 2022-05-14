import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Int,
} from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './models/cat.model';

@Resolver((of) => Cat)
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Query((returns) => [Cat])
  async cats() {
    return await this.catsService.findAll();
  }
}
