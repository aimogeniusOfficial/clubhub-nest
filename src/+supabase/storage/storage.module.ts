import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { SupabaseClientModule } from '../supabase-client/supabase-client.module';

@Module({
  imports: [SupabaseClientModule],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
