import { ACCOUNT_TYPE } from "src/common/enums/account-type.enum";
import { KYC_STATUS } from "src/common/enums/kyc-status.enum";
import { SEX } from "src/common/enums/sex.enum";
import { SIGN_WAY } from "src/common/enums/sign-way.enum";

export class User {
  id: string;
  name: string;
  country: string;
  email: string;
  phoneNumber: string;
  skype: string;
  note: string;
  capitalId: string;
  assets: number;
  password: string;
  salt: string;
  blocked: boolean;
  limitationForBid: boolean;
  refreshToken: string;
  refreshTokenExpires: Date;
  role: ACCOUNT_TYPE;
  signWay: SIGN_WAY;
  kycStatus: KYC_STATUS;
  passport: {
    fio: string;
    birthday: Date;
    placeOfBirth: string;
    sex: SEX;
    passportSeries: string;
    passportNumber: string;
    passportGiven: string;
    passportDate: Date;
    divisionCode: string;
    registrationAddress: string;
    citizenship: string;
    originalsAddress: string;
  };
  comment: string;
  passportChangeReason: string;
  subaccount: string;
  telegram: string;
  city: string;
  divisionName: string;
  age: Date;
  createdAt: Date;
  updatedAt: Date;
}
