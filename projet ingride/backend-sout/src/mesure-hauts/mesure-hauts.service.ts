import { Injectable } from '@nestjs/common';
import { CreateMesureHautDto } from './dto/create-mesure-haut.dto';
import { UpdateMesureHautDto } from './dto/update-mesure-haut.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MesureHautsService {
  constructor(private Prisma:PrismaService){}
  create(createMesureHautDto: CreateMesureHautDto) {
    return this.Prisma.mesureHaut.create({
      data:createMesureHautDto
    });
  }

  findAll() {
    return `This action returns all mesureHauts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mesureHaut`;
  }

  update(id: number, updateMesureHautDto: UpdateMesureHautDto) {
    return `This action updates a #${id} mesureHaut`;
  }

  remove(id: number) {
    return `This action removes a #${id} mesureHaut`;
  }
}
