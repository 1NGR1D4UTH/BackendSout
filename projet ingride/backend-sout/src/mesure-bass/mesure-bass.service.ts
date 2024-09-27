import { Injectable } from '@nestjs/common';
import { CreateMesureBassDto } from './dto/create-mesure-bass.dto';
import { UpdateMesureBassDto } from './dto/update-mesure-bass.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class MesureBassService {
  constructor(private Prisma:PrismaService){}
  create(createMesureBassDto: CreateMesureBassDto) {
    return this.Prisma.mesureBas.create({
      data:createMesureBassDto
    });
  }

  findAll() {
    return `This action returns all mesureBass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mesureBass`;
  }

  update(id: number, updateMesureBassDto: UpdateMesureBassDto) {
    return `This action updates a #${id} mesureBass`;
  }

  remove(id: number) {
    return `This action removes a #${id} mesureBass`;
  }
}
