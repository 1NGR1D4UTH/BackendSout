import { Test, TestingModule } from '@nestjs/testing';
import { PrendreMesuresService } from './prendre-mesures.service';

describe('PrendreMesuresService', () => {
  let service: PrendreMesuresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrendreMesuresService],
    }).compile();

    service = module.get<PrendreMesuresService>(PrendreMesuresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
