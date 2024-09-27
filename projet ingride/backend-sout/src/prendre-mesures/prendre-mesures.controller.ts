import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrendreMesuresService } from './prendre-mesures.service';
import { CreatePrendreMesureDto } from './dto/create-prendre-mesure.dto';
import { UpdatePrendreMesureDto } from './dto/update-prendre-mesure.dto';

@Controller('prendre-mesures')
export class PrendreMesuresController {
  constructor(private readonly prendreMesuresService: PrendreMesuresService) {}

  @Post()
  create(@Body() createPrendreMesureDto: CreatePrendreMesureDto) {
    return this.prendreMesuresService.create(createPrendreMesureDto);
  }

  @Get()
  findAll() {
    return this.prendreMesuresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prendreMesuresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrendreMesureDto: UpdatePrendreMesureDto) {
    return this.prendreMesuresService.update(+id, updatePrendreMesureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prendreMesuresService.remove(+id);
  }
}
