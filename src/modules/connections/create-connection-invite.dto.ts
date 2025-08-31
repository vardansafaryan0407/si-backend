import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConnectInviteDto {
  @Type(() => Number)
  @IsInt()
  senderId: number;

  @Type(() => Number)
  @IsInt()
  receiverId: number;
}
