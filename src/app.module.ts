import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { Cat } from './cats/entities/cat.entity';
import { CatFood } from './cats/entities/catFood.entity';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
