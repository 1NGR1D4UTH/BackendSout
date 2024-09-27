import { Test, TestingModule } from '@nestjs/testing';
import { PrendreMesuresController } from './prendre-mesures.controller';
import { PrendreMesuresService } from './prendre-mesures.service';

describe('PrendreMesuresController', () => {
  let controller: PrendreMesuresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrendreMesuresController],
      providers: [PrendreMesuresService],
    }).compile();

    controller = module.get<PrendreMesuresController>(PrendreMesuresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
