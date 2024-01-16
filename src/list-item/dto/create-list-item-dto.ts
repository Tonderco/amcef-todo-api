import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ItemListFlag } from '../schemas/list-item.schema';

export class CreateListItemDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  @IsString()
  readonly deadline: string;

  readonly creator: string;

  readonly listID: string;

  @IsOptional()
  @IsEnum(ItemListFlag, {
    message: 'please enter one of the enum values, Active Completed Canceled',
  })
  readonly flag: ItemListFlag;
}
