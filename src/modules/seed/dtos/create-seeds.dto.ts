import { Cultivar, Vault } from '@prisma/client';

export class CreateSeedsDto {
  userVault: Vault;
  cultivar: Cultivar;
  quantity: number;
}
