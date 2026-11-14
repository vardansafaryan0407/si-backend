import { Test, TestingModule } from '@nestjs/testing';
import { ServiceUnavailableException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  const sequelize = { authenticate: jest.fn() };

  beforeEach(async () => {
    sequelize.authenticate.mockReset();
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, { provide: Sequelize, useValue: sequelize }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the greeting', () => {
      expect(appController.getHello()).toBe('Hello world!');
    });
  });

  describe('health', () => {
    it('reports ok when the database answers', async () => {
      sequelize.authenticate.mockResolvedValue(undefined);
      await expect(appController.health()).resolves.toMatchObject({
        status: 'ok',
        db: 'up',
      });
    });

    it('returns 503 when the database does not answer', async () => {
      sequelize.authenticate.mockRejectedValue(new Error('connection refused'));
      await expect(appController.health()).rejects.toBeInstanceOf(
        ServiceUnavailableException,
      );
    });
  });
});
