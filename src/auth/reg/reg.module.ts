import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegController } from './reg.controller';
import { RegService } from './reg.service';
import { User_Nest_Auth } from 'src/postgre-sql/entity/user.entity';
import { TokenService } from '../token/token.service';
import { Token_Nest_Auth } from 'src/postgre-sql/entity/token.entity';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User_Nest_Auth, Token_Nest_Auth]),

  ],

  controllers: [RegController],
  providers: [RegService, TokenService, MailService],
})
export class RegModule { }
