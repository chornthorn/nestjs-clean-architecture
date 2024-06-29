import { Module } from '@nestjs/common';
import { Modules } from './modules/modules';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, Modules],
})
export class AppModule {}
