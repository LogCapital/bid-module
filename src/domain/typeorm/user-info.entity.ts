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
    })
    currentAccountNumber: string;

    @Column('text')
    bank: string;

    @Column('text', {
        name: 'bank_bik',
    })
    bankBik: string;

    @Column('text', {
        name: 'correspondent_account',
    })
    correspondentAccount: string;

    @Column('text')
    inn: string;

    @Column('text')
    ogrnip: string;

    @Column('text')
    fio: string;

    @Column('text')
    email: string;

    @Column('text')
    phone: string

    @Column('enum', {
        name: 'user_info_type',
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
    })
    korrPayeesAccount: string;

    @Column('text', {
        name: 'payees_account',
    })
    payeesAccount: string;

    @Column('text', {
        name: 'correspondent_bank',
    })
    correspondentBank: string;

    @Column('text', {
        name: 'payees_bank',
    })
    payeesBank: string;

    @Column('text', {
        name: 'owners_name_surname',
    })
    ownersNameSurname: string;

    @Column('text')
    snils: string;

    @Column('text', {
        name: 'place_of_birth',
    })
    placeOfBirth: string;

    @OneToOne(() => Bid, bid => bid.userInfo)
    bid: Bid;
}