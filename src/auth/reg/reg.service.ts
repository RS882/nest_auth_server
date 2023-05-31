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
import { MailService } from '../mail/mail.service';





@Injectable()
export class RegService {
  constructor(
    @InjectRepository(User_Nest_Auth)
    private usersRepository: Repository<User_Nest_Auth>,
    @InjectRepository(Token_Nest_Auth)
    private tokenRepository: Repository<Token_Nest_Auth>,
    private tokenService: TokenService,
    private mailService: MailService,
  ) { }


  async reg(user: RegUserDTO, isNeedToSendMail = false): Promise<APIUserDTO> {

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

    if (isNeedToSendMail) await this.mailService.sendActivationLink(savedNewUser.email, savedNewUser.activation_link);

    return { ...tokens, user: userRegData };


  }

  async login(user: RegUserDTO): Promise<APIUserDTO> {
    const findEmail: User_Nest_Auth[] = await this.usersRepository.findBy({ email: user.userEmail })


    if (findEmail.length === 0) throw new BadRequestException(`User is not found`)

    if (findEmail.length > 1) throw new BadRequestException(`User data is duplicated`)

    const findUser = findEmail[0];


    const isPasswordEquil: boolean = await bcrypt.compare(user.userPassword, findUser.pasword);
    if (!isPasswordEquil) throw new BadRequestException(`Incorrect password`)


    const userRegData: UserDTO = { id: findUser.id, email: findUser.email, isActivate: findUser.is_activated }
    const tokens: TokensDTO = this.tokenService.generateTokens(userRegData)
    const createdRefreshToken: Token_Nest_Auth = this.tokenRepository.create({ user_id: findUser, refresh_token: tokens.refreshToken })
    await this.tokenRepository.save(createdRefreshToken)



    return { ...tokens, user: userRegData };

  }


  // async getAll() {
  //   return this.usersRepository.find();
  // }
}
