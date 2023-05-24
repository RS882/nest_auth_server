import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegModule } from './reg/reg.module';

@Module({
  imports: [RegModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
