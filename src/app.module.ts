import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { Cat } from './cats/entities/cat.entity';
import { CatFood } from './cats/entities/catFood.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: process.env.DBLOGIN,
      password: process.env.DBPASS,
      database: 'nestjs-hello-world',
      schema: 'nestapp',
      entities: [Cat, CatFood],
      synchronize: process.env.ISPRODUCTION === 'FALSE' ? true : false,
      migrations: ['src/migrations/*{.ts,.js}'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
