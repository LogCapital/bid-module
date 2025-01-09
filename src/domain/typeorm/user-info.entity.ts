import { USER_INFO_TYPE } from "src/common/enums/user-info-type.enum";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bid } from "./bid.entity";

@Entity({ name: 'user_info' })
export class UserInfo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid', {
        name: 'user_id',
    })
    userId: string;

    @Column('text', {
        name: 'passport_series',
        nullable: true,
        default: true,
    })
    passportSeries: string;

    @Column('text', {
        name: 'passport_number',
    })
    passportNumber: string;

    @Column('text', {
        name: 'passport_date',
    })
    passportDate: string;

    @Column('text', {
        name: 'passport_given',
    })
    passportGiven: string;

    @Column('text', {
        name: 'division_code',
        nullable: true,
        default: null,
    })
    divisionCode: string;

    @Column('text', {
        name: 'registration_address',
    })
    registrationAddress: string;

    @Column('text')
    citizenship: string;

    @Column('text', {
        name: 'current_account_number',
        nullable: true,
        default: null,
    })
    currentAccountNumber: string;

    @Column('text', {
        nullable: true,
        default: null,
    })
    bank: string;

    @Column('text', {
        name: 'bank_bik',
    })
    bankBik: string;

    @Column('text', {
        name: 'correspondent_account',
    })
    correspondentAccount: string;

    @Column('text', {
        nullable: true,
        default: null,
    })
    inn: string;

    @Column('text', {
        nullable: true,
        default: null,
    })
    ogrnip: string;

    @Column('text')
    fio: string;

    @Column('text')
    email: string;

    @Column('text')
    phone: string

    @Column('enum', {
        name: 'USER_INFO_TYPE',
        enumName: 'USER_INFO_TYPE',
        enum: USER_INFO_TYPE
    })
    userInfoType: USER_INFO_TYPE;

    @Column('text', {
        name: 'originals_address',
    })
    originalsAddress: string;

    @Column('text', {
        name: 'korr_payees_account',
        nullable: true,
        default: null,
    })
    korrPayeesAccount: string;

    @Column('text', {
        name: 'payees_account',
        nullable: true,
        default: null,
    })
    payeesAccount: string;

    @Column('text', {
        name: 'correspondent_bank',
        nullable: true,
        default: null,
    })
    correspondentBank: string;

    @Column('text', {
        name: 'payees_bank',
        nullable: true,
        default: null,
    })
    payeesBank: string;

    @Column('text', {
        name: 'owners_name_surname',
        nullable: true,
        default: null,
    })
    ownersNameSurname: string;

    @Column('text', {
        nullable: true,
        default: null,
    })
    snils: string;

    @Column('timestamp', {
        nullable: true,
        default: null,
    })
    birthday: Date;

    @Column('text', {
        name: 'place_of_birth',
        nullable: true,
        default: null,
    })
    placeOfBirth: string;

    @OneToOne(() => Bid, bid => bid.userInfo)
    bid: Bid;
}