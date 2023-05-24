import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostgreSqlModule } from './postgre-sql/postgre-sql.module';

@Module({
  imports: [AuthModule, PostgreSqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
