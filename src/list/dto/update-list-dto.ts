import { IsOptional, IsString } from 'class-validator';

export class UpdateListDto {
  @IsOptional()
  @IsString()
  readonly name: string;
}
