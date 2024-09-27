import { Test, TestingModule } from '@nestjs/testing';
import { MesureBassController } from './mesure-bass.controller';
import { MesureBassService } from './mesure-bass.service';

describe('MesureBassController', () => {
  let controller: MesureBassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MesureBassController],
      providers: [MesureBassService],
    }).compile();

    controller = module.get<MesureBassController>(MesureBassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
