import { Module } from '@nestjs/common';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { PrismaModule } from 'src/prisma_client/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalEntryModule {}
