import { Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProduitsService {
  constructor(private Prisma:PrismaService){}
  create(createProduitDto: CreateProduitDto) {
    return this.Prisma.produit.create({
      data:createProduitDto
    });
  }

  findAll() {
    return `This action returns all produits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produit`;
  }

  update(id: number, updateProduitDto: UpdateProduitDto) {
    return `This action updates a #${id} produit`;
  }

  remove(id: number) {
    return `This action removes a #${id} produit`;
  }
}
