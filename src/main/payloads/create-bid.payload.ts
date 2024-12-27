import { USER_INFO_TYPE } from "src/common/enums/user-info-type.enum";

export class CreateBidPayload {
    body: {
        passportNumber: string,
        passportDate: string,
        passportGiven: string,
        registrationAddress: string,
        citizenship: string,
        bankBik: string,
        correspondentAccount: string,
        infoType: USER_INFO_TYPE,
        originalsAddress: string,
        passportSeries?: string,
        divisionCode?: string,
        currentAccountNumber: string,
        bank?: string,
        inn?: string,
        snils?: string,
        ogrnip?: string,
        korrPayeesAccount?: string,
        payeesAccount?: string,
        correspondentBank?: string,
        payeesBank?: string,
        ownersNameSurname?: string,
        birthday?: Date,
        placeOfBirth?: string
    };
    userId: string;
    authorId: string;
}