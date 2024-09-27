import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModelesService } from './modeles.service';
import { CreateModeleDto } from './dto/create-modele.dto';
import { UpdateModeleDto } from './dto/update-modele.dto';

@Controller('modeles')
export class ModelesController {
  constructor(private readonly modelesService: ModelesService) {}

  @Post()
  create(@Body() createModeleDto: CreateModeleDto) {
    return this.modelesService.create(createModeleDto);
  }

  @Get()
  findAll() {
    return this.modelesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModeleDto: UpdateModeleDto) {
    return this.modelesService.update(+id, updateModeleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelesService.remove(+id);
  }
}
