import { Test, TestingModule } from '@nestjs/testing';
import { JwttokenController } from './jwttoken.controller';

describe('JwttokenController', () => {
  let controller: JwttokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JwttokenController],
    }).compile();

    controller = module.get<JwttokenController>(JwttokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
