import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../roles/roles.guard';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCatDto: CreateCatDto): void {
    this.catsService.create({
      age: createCatDto?.age,
      breed: createCatDto?.breed,
      name: createCatDto?.name,
    } as Cat);
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get()
  findOne(@Param() params): string {
    return `The method retus a cat with id:${params?.id}`;
  }
}
