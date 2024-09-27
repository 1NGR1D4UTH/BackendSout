import { Module } from '@nestjs/common';
import { ModelesService } from './modeles.service';
import { ModelesController } from './modeles.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ModelesController],
  providers: [ModelesService,PrismaService],
})
export class ModelesModule {}
