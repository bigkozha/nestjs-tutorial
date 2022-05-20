import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsResolver } from './cats.resolver';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  providers: [CatsService, CatsResolver, CaslAbilityFactory],
  controllers: [CatsController],
})
export class CatsModule {}
