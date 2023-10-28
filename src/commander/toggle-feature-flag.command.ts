import { Command, CommandRunner, Option } from 'nest-commander';
import { PrismaService } from '../prisma_client/prisma.service';

@Command({ name: 'feature:toggle' })
export class ToggleFeatureFlagCommand extends CommandRunner {
  constructor(private prisma: PrismaService) {
    super();
  }
  async run(inputs: string[]) {
    const featureId = inputs[0];
    const isOn = inputs[1];

    if (!featureId) {
      console.log('feature id is required');
      return;
    }

    const featureFlag = await this.prisma.featureFlag.update({
      where: { id: Number(featureId) },
      data: { isEnabled: Boolean(isOn) },
    });

    console.log('Created Feature Flag', featureFlag);
    console.log(
      `Feature Flag ${featureFlag.name} is now ${featureFlag.isEnabled}`,
    );
  }
}
