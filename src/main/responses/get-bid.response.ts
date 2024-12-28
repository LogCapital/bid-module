import { Bid } from "src/domain/typeorm/bid.entity";
import { Contract } from "src/domain/typeorm/contract.entity";
import { User } from "src/domain/user.domain";

export interface IGetBidResponse {
    bid: Bid;
    user: User;
    contracts: Array<Contract>;
}