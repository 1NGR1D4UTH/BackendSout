import { Test, TestingModule } from '@nestjs/testing';
import { MesureHautsController } from './mesure-hauts.controller';
import { MesureHautsService } from './mesure-hauts.service';

describe('MesureHautsController', () => {
  let controller: MesureHautsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MesureHautsController],
      providers: [MesureHautsService],
    }).compile();

    controller = module.get<MesureHautsController>(MesureHautsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
