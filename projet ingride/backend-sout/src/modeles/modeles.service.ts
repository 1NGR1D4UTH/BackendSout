import { Injectable } from '@nestjs/common';
import { CreateModeleDto } from './dto/create-modele.dto';
import { UpdateModeleDto } from './dto/update-modele.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ModelesService {
  constructor(private Prisma:PrismaService){}
  create(createModeleDto: CreateModeleDto) {
    return this.Prisma.modele.create({
      data:createModeleDto
    });
  }

  findAll() {
    return `This action returns all modeles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modele`;
  }

  update(id: number, updateModeleDto: UpdateModeleDto) {
    return `This action updates a #${id} modele`;
  }

  remove(id: number) {
    return `This action removes a #${id} modele`;
  }
}
