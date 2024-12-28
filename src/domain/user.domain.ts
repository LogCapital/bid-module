import { ApiProperty } from '@nestjs/swagger';
import { ACCOUNT_TYPE } from 'src/common/enums/account-type.enum';
import { KYC_STATUS } from 'src/common/enums/kyc-status.enum';
import { SEX } from 'src/common/enums/sex.enum';
import { SIGN_WAY } from 'src/common/enums/sign-way.enum';
class Passport {
  @ApiProperty()
  fio: string;

  @ApiProperty({
    type: Date,
    format: 'date-time',
  })
  birthday: Date;

  @ApiProperty()
  placeOfBirth: string;

  @ApiProperty({
    type: SEX,
    enum: SEX,
    enumName: 'SEX',
  })
  sex: SEX;

  @ApiProperty()
  passportSeries: string;

  @ApiProperty()
  passportNumber: string;

  @ApiProperty()
  passportGiven: string;

  @ApiProperty({
    type: Date,
    format: 'date-time',
  })
  passportDate: Date;

  @ApiProperty()
  divisionCode: string;

  @ApiProperty()
  registrationAddress: string;

  @ApiProperty()
  citizenship: string;

  @ApiProperty()
  originalsAddress: string;
}

export class User {
  @ApiProperty({
    format: 'uuid',
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  country: string;

  @ApiProperty({
    type: 'string',
    format: 'email',
  })
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  skype: string;

  @ApiProperty()
  note: string;

  @ApiProperty()
  capitalId: string;

  @ApiProperty()
  oldCapitalId: string;

  @ApiProperty()
  assets: number;

  @ApiProperty()
  password: string;

  @ApiProperty()
  salt: string;

  @ApiProperty()
  blocked: boolean;

  @ApiProperty()
  limitationForBid: boolean;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty({
    type: Date,
    format: 'date-time',
  })
  refreshTokenExpires: Date;

  @ApiProperty({
    type: ACCOUNT_TYPE,
    enum: ACCOUNT_TYPE,
    enumName: 'ACCOUNT_TYPE',
  })
  role: ACCOUNT_TYPE;

  @ApiProperty({
    type: SIGN_WAY,
    enum: SIGN_WAY,
    enumName: 'SIGN_WAY',
  })
  signWay: SIGN_WAY;

  @ApiProperty({
    type: KYC_STATUS,
    enum: KYC_STATUS,
    enumName: 'KYC_STATUS',
  })
  kycStatus: KYC_STATUS;

  @ApiProperty({
    type: Passport,
  })
  passport: Passport;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  passportChangeReason: string;

  @ApiProperty()
  subaccount: string;

  @ApiProperty()
  telegram: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  divisionName: string;

  @ApiProperty({
    type: Date,
    format: 'date-time',
  })
  age: Date;

  @ApiProperty({
    type: Date,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    format: 'date-time',
  })
  updatedAt: Date;
}
