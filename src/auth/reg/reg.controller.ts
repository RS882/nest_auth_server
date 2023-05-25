import { Body, Controller, Post, Get } from '@nestjs/common';
import { RegUserDTO } from './DTO/regUser.dto';
import { RegService } from './reg.service';
import { APIUserDTO } from '../DTO/apiUser.dto';

@Controller('auth')
export class RegController {
  constructor(private regService: RegService) { }

  @Post('registration')
  registration(@Body() regUserDTO: RegUserDTO): Promise<APIUserDTO> {
    return this.regService.reg(regUserDTO);
  }

  @Get('registration')
  getAll() {
    return this.regService.getAll();
  }
}
