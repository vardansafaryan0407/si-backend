import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sequelize: Sequelize,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Liveness and readiness in one: 200 when the process is up and the database answers,
   * 503 otherwise. Used by the container health check and the deploy script.
   */
  @Get('health')
  async health() {
    try {
      await this.sequelize.authenticate();
    } catch (error) {
      throw new ServiceUnavailableException({
        status: 'error',
        db: 'down',
        message: error instanceof Error ? error.message : String(error),
      });
    }
    return {
      status: 'ok',
      db: 'up',
      version: process.env.APP_VERSION ?? 'dev',
      time: new Date().toISOString(),
    };
  }
}
