import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MesureHautsService } from './mesure-hauts.service';
import { CreateMesureHautDto } from './dto/create-mesure-haut.dto';
import { UpdateMesureHautDto } from './dto/update-mesure-haut.dto';

@Controller('mesure-hauts')
export class MesureHautsController {
  constructor(private readonly mesureHautsService: MesureHautsService) {}

  @Post()
  create(@Body() createMesureHautDto: CreateMesureHautDto) {
    return this.mesureHautsService.create(createMesureHautDto);
  }

  @Get()
  findAll() {
    return this.mesureHautsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mesureHautsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMesureHautDto: UpdateMesureHautDto) {
    return this.mesureHautsService.update(+id, updateMesureHautDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mesureHautsService.remove(+id);
  }
}
