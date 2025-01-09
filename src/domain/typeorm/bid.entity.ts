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
import { BID_STATUS } from "src/common/enums/bid-status.enum";
import { BID_TYPE } from "src/common/enums/bid-type.enum";
import { SIGNED_STATUS_CRM } from "src/common/enums/signed-status-crm.enum";
import { SIGNED_STATUS_LK } from "src/common/enums/signed-status-lk.enum";
import { UserInfo } from "./user-info.entity";
import { Contract } from "./contract.entity";

@Entity()
export class Bid {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid', {
        name: 'user_id',
        nullable: true,
        default: null,
    })
    userId: string;

    @Column('uuid', {
        name: 'contract_id',
        nullable: true,
        default: null,
    })
    contractId: string;

    @Column('uuid', {
        name: 'user_info_id',
        nullable: true,
        default: null,
    })
    userInfoId: string;

    @Column('text', {
        name: 'bid_number',
        unique: true,
        nullable: true,
        default: null,
    })
    bidNumber: string;

    @Column('date', {
        name: 'signed_at',
        nullable: true,
        default: null,
    })
    signedAt: Date;

    @Column('date', {
        name: 'accept_date',
        nullable: true,
        default: null,
    })
    acceptDate: string;

    @Column('text', {
        nullable: true,
        default: null,
    })
    comment: string;

    @Column('text', {
        nullable: true,
        default: null,
    })
    note: string;

    @Column('enum', {
        name: 'BID_TYPE',
        enumName: 'BID_TYPE',
        enum: BID_TYPE,
    })
    bidType: BID_TYPE;

    @Column('enum', {
        name: 'BID_STATUS',
        enumName: 'BID_STATUS',
        enum: BID_STATUS,
    })
    bidStatus: BID_STATUS;

    @Column('enum', {
        name: 'SIGNED_STATUS_LK',
        enumName: 'SIGNED_STATUS_LK',
        enum: SIGNED_STATUS_LK,
    })
    signedStatusLk: SIGNED_STATUS_LK;

    @Column('enum', {
        name: 'SIGNED_STATUS_CRM',
        enumName: 'SIGNED_STATUS_CRM',
        enum: SIGNED_STATUS_CRM,
    })
    signedStatusCrm: SIGNED_STATUS_CRM;

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