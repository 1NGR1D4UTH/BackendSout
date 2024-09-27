import { Injectable } from '@nestjs/common';
import { CreateCatalogueDto } from './dto/create-catalogue.dto';
import { UpdateCatalogueDto } from './dto/update-catalogue.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CataloguesService {
  constructor(private Prisma:PrismaService){}
  create(createCatalogueDto: CreateCatalogueDto) {
    return this.Prisma.catalogue.create({
      data:createCatalogueDto
    });
  }

  findAll() {
    return `This action returns all catalogues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogue`;
  }

  update(id: number, updateCatalogueDto: UpdateCatalogueDto) {
    return `This action updates a #${id} catalogue`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogue`;
  }
}
