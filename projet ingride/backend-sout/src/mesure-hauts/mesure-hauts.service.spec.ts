import { Test, TestingModule } from '@nestjs/testing';
import { MesureHautsService } from './mesure-hauts.service';

describe('MesureHautsService', () => {
  let service: MesureHautsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MesureHautsService],
    }).compile();

    service = module.get<MesureHautsService>(MesureHautsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
