import { Injectable } from '@nestjs/common';
import { RegUserDTO } from './DTO/regUser.dto';

@Injectable()
export class RegService {
  private readonly users: RegUserDTO[] = [];

  async reg(user: RegUserDTO) {
    this.users.push(user);
    return this.users;
  }

  //   async getAll() {
  //     return this.users;
  //   }
}
