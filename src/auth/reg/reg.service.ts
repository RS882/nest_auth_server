import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { env } from 'process';

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

  async #getAPIUserDTO(data: User_Nest_Auth, isNeedToSendMail = false): Promise<APIUserDTO> {
    const userRegData: UserDTO = { id: data.id, email: data.email, isActivate: data.is_activated }
    const tokens: TokensDTO = this.tokenService.generateTokens(userRegData)
    const createdRefreshToken: Token_Nest_Auth = this.tokenRepository.create({ user_id: data, refresh_token: tokens.refreshToken })
    await this.tokenRepository.save(createdRefreshToken)

    if (isNeedToSendMail) await this.mailService.sendActivationLink(
      data.email,
      `${env.API_URL}/auth/activate/${data.activation_link}`);

    return { ...tokens, user: userRegData };
  }

  async reg(user: RegUserDTO): Promise<APIUserDTO> {

    const findEmail: User_Nest_Auth[] = await this.usersRepository.findBy({ email: user.userEmail })
    if (findEmail.length > 0) throw new BadRequestException(`The user with email ${user.userEmail} has already been registered`)

    const hashPass: string = await bcrypt.hash(user.userPassword, 3)
    const uuidActivationLink: string = uuidv4();

    const createdNewUser: User_Nest_Auth = this.usersRepository.create({ email: user.userEmail, pasword: hashPass, activation_link: uuidActivationLink });
    const savedNewUser: User_Nest_Auth = await this.usersRepository.save(createdNewUser)

    return this.#getAPIUserDTO(savedNewUser)


  }

  async login(user: RegUserDTO): Promise<APIUserDTO> {
    const findEmail: User_Nest_Auth[] = await this.usersRepository.findBy({ email: user.userEmail })
    if (findEmail.length === 0) throw new BadRequestException(`User is not found`)
    if (findEmail.length > 1) throw new BadRequestException(`User data is duplicated`)
    const isPasswordEquil: boolean = await bcrypt.compare(user.userPassword, findEmail[0].pasword);
    if (!isPasswordEquil) throw new BadRequestException(`Incorrect password`)

    return this.#getAPIUserDTO(findEmail[0])
  }

  async logout(token: string): Promise<DeleteResult> {
    return this.tokenRepository.delete({ refresh_token: token })
  }

  async activate(link: string): Promise<void> {
    const findLink = await this.usersRepository.findBy({ activation_link: link })
    if (findLink.length === 0) throw new BadRequestException(`Incorrect activation link`)
    if (findLink.length > 1) throw new BadRequestException(`User data is duplicated`)
    await this.usersRepository.update({ is_activated: true }, { activation_link: link })
  }

  // async getAll() {
  //   return this.usersRepository.find();
  // }
}
