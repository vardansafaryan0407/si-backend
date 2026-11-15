import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyResetDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
