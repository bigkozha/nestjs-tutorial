import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql.guard';
import { CatsService } from './cats.service';
import { Cat } from './models/cat.model';

@Resolver((of) => Cat)
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Cat])
  async cats() {
    return await this.catsService.findAll();
  }
}
