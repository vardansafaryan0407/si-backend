import { Body, Controller, Post } from '@nestjs/common';
import { ConnectUsDto } from './connect-us.dto';
import { ConnectUsService } from './connect-us.service';

@Controller('connect-us')
export class ConnectUsController {
  constructor(private readonly connectUsService: ConnectUsService) {}

  @Post()
  async send(@Body() dto: ConnectUsDto) {
    return await this.connectUsService.sendConnectMessage(
      dto.email,
      dto.subject,
      dto.description,
    );
  }
}
