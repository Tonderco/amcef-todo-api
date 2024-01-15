import { IsArray, IsOptional, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { ListItem } from '../../list-item/schemas/list-item.schema';

export class UpdateListDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsArray()
  readonly users: User[];

  @IsOptional()
  @IsArray()
  readonly listItems: ListItem[];
}
