import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { RegUserDTO } from './DTO/regUser.dto';
import { User_Nest_Auth } from 'src/postgre-sql/entity/user.entity';
import { TokenService } from './../token/token.service';
import { TokensDTO } from '../DTO/tokens.dto';
import { UserDTO } from '../DTO/user.dto';
import { APIUserDTO } from '../DTO/apiUser.dto';
import { Token_Nest_Auth } from 'src/postgre-sql/entity/token.entity';





@Injectable()
export class RegService {
  constructor(
    @InjectRepository(User_Nest_Auth)
    private usersRepository: Repository<User_Nest_Auth>,
    @InjectRepository(Token_Nest_Auth)
    private tokenRepository: Repository<Token_Nest_Auth>,
    private tokenService: TokenService
  ) { }


  async reg(user: RegUserDTO): Promise<APIUserDTO> {

    const findEmail: User_Nest_Auth[] = await this.usersRepository.findBy({ email: user.userEmail })
    if (findEmail.length > 0) throw new BadRequestException(`The user with email ${user.userEmail} has already been registered`)

    const hashPass: string = await bcrypt.hash(user.userPassword, 3)
    const uuidActivationLink: string = uuidv4();
    const createdNewUser: User_Nest_Auth = this.usersRepository.create({ email: user.userEmail, pasword: hashPass, activation_link: uuidActivationLink });
    const savedNewUser: User_Nest_Auth = await this.usersRepository.save(createdNewUser)
    const userRegData: UserDTO = { id: savedNewUser.id, email: savedNewUser.email, isActivate: savedNewUser.is_activated }

    const tokens: TokensDTO = this.tokenService.generateTokens(userRegData)
    const createdRefreshToken: Token_Nest_Auth = this.tokenRepository.create({ user_id: savedNewUser, refresh_token: tokens.refreshToken })
    await this.tokenRepository.save(createdRefreshToken)

    return { ...tokens, user: userRegData };


  }

  async getAll() {
    return this.usersRepository.find();
  }
}
