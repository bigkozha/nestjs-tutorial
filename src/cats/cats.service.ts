import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './create-cat.dto';

@Injectable({
  scope: Scope.DEFAULT,
})
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    //how to validate dtos?
    await this.catsRepository.save({
      age: createCatDto?.age,
      breed: createCatDto?.breed,
      name: createCatDto?.name,
    } as Cat);
  }

  async findAll(): Promise<Cat[]> {
    //alway have to write joins by hands?
    const categoriesWithQuestions = await this.catsRepository
      .createQueryBuilder('cats')
      .leftJoinAndSelect('cats.catFoods', 'catFoods')
      .getMany();

    return categoriesWithQuestions;
  }
}
