import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { RegUserDTO } from './DTO/regUser.dto';
import { User_Nest_Auth } from 'src/postgre-sql/entity/user.entity';





@Injectable()
export class RegService {
  constructor(
    @InjectRepository(User_Nest_Auth)
    private usersRepository: Repository<User_Nest_Auth>,
  ) { }

  async reg(user: RegUserDTO) {


    // try {
    const hashPass: string = await bcrypt.hash(user.userPassword, 3)

    console.log(hashPass);
    const uuidActivationLink: string = uuidv4();
    const createNewUser = this.usersRepository.create({ email: user.userEmail, pasword: hashPass, activation_link: uuidActivationLink });
    return this.usersRepository.save(createNewUser);
    // } catch (error) {
    //   console.log(error);

    // }

  }

  async getAll() {
    return this.usersRepository.find();
  }
}
