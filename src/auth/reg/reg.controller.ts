import { Body, Controller, Post, Get, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';

import { RegUserDTO } from './DTO/regUser.dto';
import { RegService } from './reg.service';
import { APIUserDTO } from '../DTO/apiUser.dto';
import { RegInterceptor } from './reg.interceptor';

@Controller('auth')
export class RegController {
  constructor(private regService: RegService) { }



  @Post('registration')
  @UseInterceptors(RegInterceptor)
  async registration(
    @Body() regUserDTO: RegUserDTO): Promise<APIUserDTO> {


    const regNewUser: APIUserDTO = await this.regService.reg(regUserDTO)

    return regNewUser
  }

  @Post('login')
  @UseInterceptors(RegInterceptor)
  async login(
    @Body() logUserDTO: RegUserDTO): Promise<APIUserDTO> {

    const logUser: APIUserDTO = await this.regService.login(logUserDTO)
    return logUser
  }

  // @Get('registration')
  // getAll() {
  //   return this.regService.getAll();
  // }
}
