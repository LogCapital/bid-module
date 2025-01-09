import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Bid } from "./bid.entity";
import { CONTRACT_STATUS } from "src/common/enums/contract-status.enum";

@Entity()
export class Contract {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid', {
        name: 'user_id',
    })
    userId: string;

    @Column('enum', {
        name: 'CONTRACT_STATUS',
        enumName: 'CONTRACT_STATUS',
        enum: CONTRACT_STATUS,
    })
    contractStatus: CONTRACT_STATUS;

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

    @OneToMany(() => Bid, bid => bid.contract)
    bids: Bid[];
}