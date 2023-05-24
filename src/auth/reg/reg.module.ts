import { Module } from '@nestjs/common';
import { RegController } from './reg.controller';
import { RegService } from './reg.service';

@Module({
  controllers: [RegController],
  providers: [RegService],
})
export class RegModule {}
