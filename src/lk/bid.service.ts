import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientNats, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/infrastructure/provider.constants';
import { IGetBidResponse } from './responses/get-bid.response';
import { GetBidPayload } from './payloads/get-bid.payload';
import { Bid } from 'src/domain/typeorm/bid.entity';
import { BID_STATUS } from 'src/common/enums/bid-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from 'src/domain/typeorm/contract.entity';
import { BID_TYPE } from 'src/common/enums/bid-type.enum';
import { resolveObservable } from 'src/infrastructure/resolver.observable';

@Injectable()
export class BidService {
    constructor(
        @Inject(NATS_SERVICE)
        private readonly natsClient: ClientNats,
        @InjectRepository(Bid)
        private readonly bidRepository: Repository<Bid>,
        @InjectRepository(Contract)
        private readonly contractRepository: Repository<Contract>,
    ) {}

    async getBid(payload: GetBidPayload): Promise<IGetBidResponse> {
        try {
            const bid = await this.bidRepository.findOne({
                where: {
                    userId: payload.userId,
                    bidType: BID_TYPE.APPLICATION_FOR_ACCESSION,
                }
            });
            if (!bid) throw new RpcException({
                code: HttpStatus.NOT_FOUND,
                message: `Основное заявление о присоединении для пользователя с id ${payload.userId} не найдено`,
            });
            // await this.scansUtilService.loadScansToBid(bid);

            const user = await resolveObservable(this.natsClient.send('get-user-by-id', { userId: payload.userId }));

            const contracts = await this.contractRepository.find({
                where: {
                    userId: payload.userId,
                }
            });

            if ([BID_STATUS.UNDER_REVIEW, BID_STATUS.AWAITING_VERIFICATION].includes(bid.bidStatus)) throw new RpcException({
                code: HttpStatus.BAD_REQUEST,
                message: `В статусе ${bid.bidStatus} заявка скрыта от трейдера`,
            });

            return {
                bid,
                user,
                contracts,
            }
        } catch (err) {
            console.log(err);
            throw new RpcException({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: err,
            });
        }
    }
}
