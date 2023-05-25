import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegModule } from './reg/reg.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [RegModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
