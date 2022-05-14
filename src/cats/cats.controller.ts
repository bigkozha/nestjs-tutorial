import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): void {
    this.catsService.create({
      age: createCatDto?.age,
      breed: createCatDto?.breed,
      name: createCatDto?.name,
    } as Cat);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get()
  findOne(@Param() params): string {
    return `The method retus a cat with id:${params?.id}`;
  }
}
