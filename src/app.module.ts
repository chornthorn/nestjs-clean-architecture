import { Module } from '@nestjs/common';
import { Modules } from './modules/modules';
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    DatabaseModule.register({
      isGlobal: true,
    }),
    SharedModule,
    Modules,
  ],
})
export class AppModule {}
