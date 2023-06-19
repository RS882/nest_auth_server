import { Body, Controller, Post, Get, Res, Req, UseInterceptors, HttpCode, HttpStatus, Param, Redirect } from '@nestjs/common';
import { Request, Response } from 'express';

import { RegUserDTO } from './DTO/regUser.dto';
import { RegService } from './reg.service';
import { APIUserDTO } from '../DTO/apiUser.dto';
import { RegInterceptor } from './reg.interceptor';
import { env } from 'process';

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

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response): Promise<void> {
    const { refreshToken } = request.cookies;
    await this.regService.logout(refreshToken)
    response.clearCookie('refreshToken');
    return;


  }

  @Get('activate')
  @Redirect(env.CLIENT_URL!, HttpStatus.MOVED_PERMANENTLY)
  async activate(@Param('link') link: string,): Promise<void> {
    await this.regService.activate(link)

    return;

  }
  @Get('refresh')
  async refresh(@Req() request: Request,) {
    const { refreshToken } = request.cookies;

    const refreshData: APIUserDTO = await this.regService.refresh(refreshToken)
    return refreshData
  }

  // @Get('registration')
  // getAll() {
  //   return this.regService.getAll();
  // }
}
