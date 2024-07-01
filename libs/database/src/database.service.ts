import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

/*
  - The DatabaseService class extends PrismaClient and implements OnModuleInit.
  - The PrismaClient class is a generated class that provides methods to interact with the database.
  - The OnModuleInit interface provides a lifecycle hook that is called when the module is initialized.
  - The DatabaseService class uses the PrismaClient class to interact
 */
@Injectable()
export class DatabaseService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'info' | 'warn' | 'error'
  >
  implements OnModuleInit
{
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    this.$on('query', (event: Prisma.QueryEvent) => {
      this.logger.debug(`Query: ${event.query}`);
      this.logger.debug(`Duration: ${event.duration}ms`);
    });

    await this.$connect();
  }
}
