import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './message.service';
import { CreateMessageDto } from './create-message.dto';
import { HistoryDto } from './history.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async sendMessage(@Body() dto: CreateMessageDto, @Req() req: any) {
    const senderId = req.user.id;
    return this.messagesService.sendMessage(senderId, dto);
  }

  @Get('history')
  @UseGuards(AuthGuard)
  async getHistory(@Query() query: HistoryDto, @Req() req: any) {
    const userId = req.user.id;
    return this.messagesService.getConversation(
      userId,
      query.partnerId,
      query.offset,
      query.limit,
    );
  }

  @Get('partners')
  @UseGuards(AuthGuard)
  async getPartners(@Req() req: any) {
    const userId = req.user.id;
    return this.messagesService.getPartners(userId);
  }
}
