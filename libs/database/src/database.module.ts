import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './database.module-definition';
import { DatabaseService } from './database.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [DatabaseService, PrismaService],
  exports: [DatabaseService, PrismaService],
})
export class DatabaseModule extends ConfigurableModuleClass {}
