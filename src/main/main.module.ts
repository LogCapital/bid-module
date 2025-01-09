import { Module } from "@nestjs/common";
import { MainController } from "./main.controller";
import { MainService } from "./main.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bid } from "src/domain/typeorm/bid.entity";
import { Contract } from "src/domain/typeorm/contract.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Bid, Contract])],
    controllers: [MainController],
    providers: [MainService],
})
export class MainModule {}