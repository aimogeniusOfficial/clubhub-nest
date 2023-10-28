import { Module } from '@nestjs/common';
import { SupabaseClientService } from './supabase-client.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [],
  providers: [SupabaseClientService],
  exports: [SupabaseClientService],
})
export class SupabaseClientModule {}
