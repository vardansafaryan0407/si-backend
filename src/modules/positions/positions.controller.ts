import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../core/guards/auth.guard';
import { GetUser } from '../../core/decorators/get-user.decorator';
import { IUserSession } from '../../core/interfaces/user-session';
import { ListPositionsQuery } from './dto/list-positions.query';
import { PositionsService } from './positions.service';

// The GET routes are public on purpose: the position pages are rendered on the server
// for search engines, which neither sign in nor send POST requests.
@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  list(@Query() query: ListPositionsQuery) {
    return this.positionsService.list(query);
  }

  @Get('sitemap')
  sitemap() {
    return this.positionsService.sitemap();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.positionsService.getOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/close')
  close(@Param('id', ParseIntPipe) id: number, @GetUser() user: IUserSession) {
    return this.positionsService.close(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/reopen')
  reopen(@Param('id', ParseIntPipe) id: number, @GetUser() user: IUserSession) {
    return this.positionsService.reopen(id, user.id);
  }
}
