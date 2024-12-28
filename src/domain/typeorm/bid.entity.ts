import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { UserInfo } from "./user-info.entity";
import { Contract } from "./contract.entity";
import { BID_TYPE } from "src/common/enums/bid-type.enum";
import { BID_STATUS } from "src/common/enums/bid-status.enum";
import { SIGNED_STATUS_LK } from "src/common/enums/signed-status-lk.enum";
import { SIGNED_STATUS_CRM } from "src/common/enums/signed-status-crm.enum";

@Entity()
export class Bid {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid', {
        name: 'user_id',
    })
    userId: string;

    @Column('uuid', {
        name: 'contract_id',
    })
    contractId: string;

    @Column('uuid', {
        name: 'user_info_id',
    })
    userInfoId: string;

    @Column('text', {
        name: 'bid_number',
        unique: true,
    })
    bidNumber: string;

    @Column('text', {
        name: 'signed_at',
    })
    signedAt: string;

    @Column('text', {
        name: 'saccept_date',
    })
    acceptDate: string;

    @Column('text')
    comment: string;

    @Column('text')
    note: string;

    @Column('enum', {
        name: 'bid_type',
        enumName: 'BID_TYPE',
        enum: BID_TYPE,
    })
    bidType: BID_TYPE;

    @Column('enum', {
        name: 'bid_status',
        enumName: 'BID_STATUS',
        enum: BID_STATUS,
    })
    bidStatus: BID_STATUS;

    @Column('enum', {
        name: 'signed_status_lk',
        enumName: 'SIGNED_STATUS_LK',
        enum: SIGNED_STATUS_LK,
    })
    signedStatusLk: SIGNED_STATUS_LK;

    @Column('enum', {
        name: 'signed_status_crm',
        enumName: 'SIGNED_STATUS_CRM',
        enum: SIGNED_STATUS_CRM,
    })
    signedStatusCrm: SIGNED_STATUS_CRM;

    @Column('boolean', {
        name: 'is_primary_requisities',
    })
    isPrimaryRequisities: boolean;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
    })
    updatedAt: Date;

    @OneToOne(() => UserInfo, userInfo => userInfo.bid)
    @JoinColumn({
        name: 'user_info_id',
    })
    userInfo: UserInfo;

    @ManyToOne(() => Contract, contract => contract.bids)
    @JoinColumn({
        name: 'contract_id',
    })
    contract: Contract;
}