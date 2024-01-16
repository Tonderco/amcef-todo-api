import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ItemListFlag } from '../schemas/list-item.schema';

export class UpdateListItemDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly text: string;

  @IsOptional()
  @IsString()
  readonly deadline: string;

  readonly creator: string;

  @IsOptional()
  @IsString()
  readonly listID: string;

  @IsOptional()
  @IsEnum(ItemListFlag, {
    message: 'please enter one of the enum values, Active Completed Canceled',
  })
  readonly flag: ItemListFlag;
}
