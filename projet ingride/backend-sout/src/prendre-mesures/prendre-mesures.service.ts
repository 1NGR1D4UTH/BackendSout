import { Injectable } from '@nestjs/common';
import { CreatePrendreMesureDto } from './dto/create-prendre-mesure.dto';
import { UpdatePrendreMesureDto } from './dto/update-prendre-mesure.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrendreMesuresService {
  constructor(private Prisma:PrismaService){}
  create(createPrendreMesureDto: CreatePrendreMesureDto) {
    return this.Prisma.prendreMesure.create({
      data:createPrendreMesureDto
    });
  }

  findAll() {
    return `This action returns all prendreMesures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prendreMesure`;
  }

  update(id: number, updatePrendreMesureDto: UpdatePrendreMesureDto) {
    return `This action updates a #${id} prendreMesure`;
  }

  remove(id: number) {
    return `This action removes a #${id} prendreMesure`;
  }
}
