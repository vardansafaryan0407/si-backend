import { Test, TestingModule } from '@nestjs/testing';
import { UsersSkillsController } from './users-skills.controller';

describe('UsersSkillsController', () => {
  let controller: UsersSkillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersSkillsController],
    }).compile();

    controller = module.get<UsersSkillsController>(UsersSkillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
