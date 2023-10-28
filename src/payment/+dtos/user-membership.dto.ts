import { IsDate } from 'class-validator';

export class UserMembershipDto {
  id: bigint;
  userId: string;
  @IsDate()
  activation_date: Date;
  @IsDate()
  expiry_date: Date;
}
