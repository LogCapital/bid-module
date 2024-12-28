import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
