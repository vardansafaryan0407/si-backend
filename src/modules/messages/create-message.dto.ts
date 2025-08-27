import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  @IsPositive()
  receiverId: number;

  @IsString()
  @MinLength(1)
  text: string;
}
