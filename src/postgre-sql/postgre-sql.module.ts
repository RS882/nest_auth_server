import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { env } from 'process';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: env.PGHOST,
        port: +env.PGPORT!,
        username: env.PGUSER,
        password: env.PGPASSWORD,
        database: env.PGDATABASE,
        entities: [`entity/*.entity.ts`],
        synchronize: true,
      }),
    }),
  ],
})
export class PostgreSqlModule {}
