import { Module } from '@nestjs/common';
import { MesureBassService } from './mesure-bass.service';
import { MesureBassController } from './mesure-bass.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MesureBassController],
  providers: [MesureBassService,PrismaService],
})
export class MesureBassModule {}
