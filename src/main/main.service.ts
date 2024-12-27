import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateBidPayload } from "./payloads/create-bid.payload";
import { ICreateBidResponse } from "./responses/create-bid.response";
import { InjectRepository } from "@nestjs/typeorm";
import { Bid } from "src/domain/typeorm/bid.entity";
import { Repository } from "typeorm";
import { NATS_SERVICE } from "src/infrastructure/provider.constants";
import { ClientNats, RpcException } from "@nestjs/microservices";
import { Contract } from "src/domain/typeorm/contract.entity";
import { CONTRACT_STATUS } from "src/common/enums/contract-status.enum";
import { BID_STATUS } from "src/common/enums/bid-status.enum";
import { UserInfo } from "src/domain/typeorm/user-info.entity";

@Injectable()
export class MainService {
    constructor(
        @Inject(NATS_SERVICE)
        private readonly natsClient: ClientNats,
        @InjectRepository(Bid)
        private readonly bidRepository: Repository<Bid>,
        @InjectRepository(Contract)
        private readonly contractRepository: Repository<Contract>,
        @InjectRepository(UserInfo)
        private readonly userInfoRepository: Repository<UserInfo>,
    ) {}

    async createBid(payload: CreateBidPayload): Promise<ICreateBidResponse> {
        try {
            const contracts = await this.contractRepository.find({
                where: {
                    userId: payload.userId,
                },
            });
            contracts.forEach(contract => {
                if (
                    contract.contractStatus !== CONTRACT_STATUS.TERMINATED &&
                    contract.contractStatus !== CONTRACT_STATUS.NO_CONTRACT
                ) throw new RpcException({
                    code: HttpStatus.BAD_REQUEST,
                    message: 'У этого пользователя уже есть активный договор',
                });
            })

            const bids = await this.bidRepository.find({
                where: {
                    userId: payload.userId,
                },
            });
            bids.forEach(bid => {
                if (bid.bidStatus !== BID_STATUS.REJECTED) throw new RpcException({
                    code: HttpStatus.BAD_REQUEST,
                    message: 'У этого пользователя уже есть заявление о присоединении',
                });
            })

            const contractId = (
                await this.contractRepository.save(
                    this.contractRepository.create({
                        userId: payload.userId,
                        contractStatus: CONTRACT_STATUS.ON_SIGNING,
                    }),
                )
            ).id;
            const userInfoId = (
                await this.userInfoRepository.save(
                    this.userInfoRepository.create({
                        ...payload.body,
                    }),
                )
            ).id;

            await this.bidRepository.save(
                this.bidRepository.create({
                    userId: payload.userId,
                    contractId: contractId,
                    userInfoId: userInfoId,
                }),
            );

            const bid = await this.bidRepository.findOne({
                where: {
                    contractId: contractId,
                },
                relations: ['contract'],
            });
            if (!bid) throw new RpcException({
                code: HttpStatus.BAD_REQUEST,
                message: 'Нет данных по договору',
            });

            // await this.scansUtilService.loadScansToBid(bid); //Обращение к модулю сканов
            // await this.eventDocDataService.save( //Обращение к event-doc модулю?
            //     new EventDoc({
            //         eventType: EVENT_TYPE.BID,
            //         authorId: authorId,
            //         bidId: bid.id,
            //         data: bid,
            //         status: 'Форма заполнена',
            //     }),
            // );

            // if (bid.userId !== authorId) {
            //     this.notificationService.emit('crm', { //Обращение к notification модулю
            //         userId: bid.userId,
            //         text: 'Форма заполнена',
            //         notificationType: NOTIFICATION_TYPE.BID,
            //         createdAt: new Date(),
            //     });
            //     await this.notificationDataService.save(
            //         new Notification({
            //             id: uuid(),
            //             message: 'Форма заполнена',
            //             userId: bid.userId,
            //             notificationType: NOTIFICATION_TYPE.BID,
            //         }),
            //     );
            // } else {
            //     // this.notificationService.emit(bid.userId, {message: 'Форма заполнена'})
            // }

            return {
                bidId: bid.id
            }
        } catch (err) {
            console.log(err);
            throw new RpcException({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: err
            });
        }
    }
}