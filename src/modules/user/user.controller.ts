import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { UserUpdateDto } from './dto/user-update.dto';
import { GetUser } from '../../core/decorators/get-user.decorator';
import { IUserSession } from '../../core/interfaces/user-session';
import { IUsersQueryInterface } from 'si-shared-library';
import { Pagination } from 'src/core/models/pagination';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3service/s3.service';
import { memoryStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly s3Service: S3Service,
  ) {}

  @UseGuards(AuthGuard)
  @Get('')
  public async getCurrentUser(@Request() req) {
    const userId = req.user.id;
    return this.userService.find(userId);
  }

  @Get('list')
  async getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  @Get('premium/:id')
  async getPremiumUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.userService.getPremiumUserById(id);
  }

  @Post('search')
  async searchUsers(
    @Body() body: { query: IUsersQueryInterface; pagination: Pagination },
  ) {
    const { query, pagination } = body;
    return this.userService.searchUsers(query, pagination);
  }

  @UseGuards(AuthGuard)
  @Put('update')
  async updateCurrentUser(
    @Body() userData: UserUpdateDto,
    @GetUser() user: IUserSession,
  ): Promise<User> {
    return this.userService.updateUserWithSkills(user.id, userData);
  }

  @Post('upload-avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowed.includes(file.mimetype)) cb(null, true);
        else cb(new BadRequestException('Invalid file type'), false);
      },
    }),
  )
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) throw new BadRequestException('File is required');

    const user = req.user;
    const ext = extname(file.originalname) || '';
    const key = `avatars/user-${user.id}-${Date.now()}${ext}`;

    await this.s3Service.uploadFile(file, key);
    const signedUrl = await this.userService.updateAvatar(user.id, key);

    return { url: signedUrl };
  }
}
