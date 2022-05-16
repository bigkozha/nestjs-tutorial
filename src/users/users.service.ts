import { Injectable } from '@nestjs/common';
import { Role } from '../roles/enums/role.enum';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: [Role.User],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    const result = this.users.find((u) => u.username === username);

    return result;
  }
}
