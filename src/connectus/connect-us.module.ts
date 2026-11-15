import { Module } from '@nestjs/common';
import { ConnectUsService } from './connect-us.service';
import { ConnectUsController } from './connect-us.controller';

@Module({
  controllers: [ConnectUsController],
  providers: [ConnectUsService],
})
export class ConnectUsModule {}
