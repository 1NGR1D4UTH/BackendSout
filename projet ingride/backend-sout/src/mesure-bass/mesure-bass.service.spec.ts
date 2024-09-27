import { Test, TestingModule } from '@nestjs/testing';
import { MesureBassService } from './mesure-bass.service';

describe('MesureBassService', () => {
  let service: MesureBassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MesureBassService],
    }).compile();

    service = module.get<MesureBassService>(MesureBassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
