import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegController } from './reg.controller';
import { RegService } from './reg.service';
import { User_Nest_Auth } from 'src/postgre-sql/entity/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User_Nest_Auth])],

  controllers: [RegController],
  providers: [RegService],
})
export class RegModule { }
