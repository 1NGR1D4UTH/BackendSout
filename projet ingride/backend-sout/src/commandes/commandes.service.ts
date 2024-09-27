import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommandesService {
  constructor(private Prisma :PrismaService){}
  create(createCommandeDto: CreateCommandeDto) {
    return this.Prisma.commande.create({
      data:createCommandeDto
    });
  }

  findAll() {
    return `This action returns all commandes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commande`;
  }

  update(id: number, updateCommandeDto: UpdateCommandeDto) {
    return `This action updates a #${id} commande`;
  }

  remove(id: number) {
    return `This action removes a #${id} commande`;
  }
}
