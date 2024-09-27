import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MesureBassService } from './mesure-bass.service';
import { CreateMesureBassDto } from './dto/create-mesure-bass.dto';
import { UpdateMesureBassDto } from './dto/update-mesure-bass.dto';

@Controller('mesure-bass')
export class MesureBassController {
  constructor(private readonly mesureBassService: MesureBassService) {}

  @Post()
  create(@Body() createMesureBassDto: CreateMesureBassDto) {
    return this.mesureBassService.create(createMesureBassDto);
  }

  @Get()
  findAll() {
    return this.mesureBassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mesureBassService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMesureBassDto: UpdateMesureBassDto) {
    return this.mesureBassService.update(+id, updateMesureBassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mesureBassService.remove(+id);
  }
}
