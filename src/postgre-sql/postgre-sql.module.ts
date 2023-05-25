import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Nest_Auth } from './entity/user.entity';
import { Token_Nest_Auth } from './entity/token.entity';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (confifServise: ConfigService) => ({
        type: 'postgres',
        host: confifServise.get('PGHOST'),
        port: confifServise.get('PGPORT'),
        username: confifServise.get('PGUSER'),
        password: confifServise.get('PGPASSWORD'),
        database: confifServise.get('PGDATABASE'),

        // host: env.PGHOST,
        // port: +env.PGPORT!,
        // username: env.PGUSER,
        // password: env.PGPASSWORD,
        // database: env.PGDATABASE,

        // entities: [`entity/*.entity.ts`],
        entities: [User_Nest_Auth, Token_Nest_Auth],
        synchronize: true,
      }),
    }),
  ],
})
export class PostgreSqlModule { }
