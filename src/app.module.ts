import { Module } from '@nestjs/common';
import { NeconfigModule } from 'neconfig';
import * as path from 'path';

@Module({
  imports: [
    NeconfigModule.register({
      readers: [{ name: 'env', file: path.resolve(process.cwd(), '.env') }],
    }),
  ],
})
export class AppModule {}
