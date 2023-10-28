import { IsNotEmpty } from 'class-validator';

export class SeedVaultDto {
  @IsNotEmpty()
  cultivarId: bigint;
}
