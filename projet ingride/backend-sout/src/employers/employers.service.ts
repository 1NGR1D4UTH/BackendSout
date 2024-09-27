import { Injectable } from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class EmployersService {
  constructor(private Prisma:PrismaService){}
  create(createEmployerDto: CreateEmployerDto) {
    return this.Prisma.employer.create({
      data:createEmployerDto
    });
  }

  findAll() {
    return `This action returns all employers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employer`;
  }

  update(id: number, updateEmployerDto: UpdateEmployerDto) {
    return `This action updates a #${id} employer`;
  }

  remove(id: number) {
    return `This action removes a #${id} employer`;
  }
}
