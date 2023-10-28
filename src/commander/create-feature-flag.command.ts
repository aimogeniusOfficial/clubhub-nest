import { Command, CommandRunner, Option } from 'nest-commander';
import { PrismaService } from '../prisma_client/prisma.service';

@Command({ name: 'feature:create' })
export class CreateFeatureFlagCommand extends CommandRunner {
  constructor(private prisma: PrismaService) {
    super();
  }
  async run(inputs: string[]) {
    const name = inputs[0];
    const description = inputs[1];
    if (!name) {
      console.log('name is required');
      return;
    }

    if (!description) {
      console.log('description is required');
      return;
    }

    const featureFlag = await this.prisma.featureFlag.create({
      data: { name, description },
    });

    console.log('Created Feature Flag', featureFlag);
  }
}
