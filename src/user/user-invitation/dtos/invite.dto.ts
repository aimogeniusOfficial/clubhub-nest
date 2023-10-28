import { IsNotEmpty } from 'class-validator';

export class InviteDto {
  id: bigint;
  token: string;
  createdAt: Date;
  expirationDate: Date;
  @IsNotEmpty()
  inviteeEmail: string;
  inviterId: string;
}
