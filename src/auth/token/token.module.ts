import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { Token_Nest_Auth } from 'src/postgre-sql/entity/token.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],

})
export class TokenModule { }
