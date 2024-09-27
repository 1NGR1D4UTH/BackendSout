import { Module } from '@nestjs/common';
import { PrendreMesuresService } from './prendre-mesures.service';
import { PrendreMesuresController } from './prendre-mesures.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PrendreMesuresController],
  providers: [PrendreMesuresService,PrismaService],
})
export class PrendreMesuresModule {}
