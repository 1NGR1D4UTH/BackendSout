import { Module } from '@nestjs/common';
import { MesureHautsService } from './mesure-hauts.service';
import { MesureHautsController } from './mesure-hauts.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MesureHautsController],
  providers: [MesureHautsService,PrismaService],
})
export class MesureHautsModule {}
