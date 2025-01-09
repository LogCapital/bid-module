import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidService } from './bid.service';
import { LkController } from './lk.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [LkController],
  providers: [BidService],
})
export class LkModule {}
