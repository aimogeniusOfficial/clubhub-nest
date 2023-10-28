import { IsNotEmpty } from 'class-validator';

export class AddSeedsToVaultDto {
  @IsNotEmpty()
  cultivarId: bigint;

  @IsNotEmpty()
  amount: number;
}
