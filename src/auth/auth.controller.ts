import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {



  @Get('activate/:link')
  getAll4(): string {
    return `getAll`;
  }

  @Get('refresh')
  getAll5(): string {
    return `getAll`;
  }
}
