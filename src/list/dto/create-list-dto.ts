import { IsArray, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { ListItem } from '../../list-item/schemas/list-item.schema';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsEmpty()
  @IsArray()
  readonly users: User[];

  @IsEmpty()
  @IsArray()
  listItems: ListItem[];
}
