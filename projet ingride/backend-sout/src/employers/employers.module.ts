import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EmployersController],
  providers: [EmployersService,PrismaService],
})
export class EmployersModule {}
