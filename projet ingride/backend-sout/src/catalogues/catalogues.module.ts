import { Module } from '@nestjs/common';
import { CataloguesService } from './catalogues.service';
import { CataloguesController } from './catalogues.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CataloguesController],
  providers: [CataloguesService,PrismaService],
})
export class CataloguesModule {}
