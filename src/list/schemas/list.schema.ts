import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../auth/schemas/user.schema';
import { ListItem } from '../../list-item/schemas/list-item.schema';

@Schema({
  timestamps: true,
})
export class List {
  @Prop()
  name: string;

  @Prop()
  users: User[];

  @Prop()
  listItems: ListItem[];
}

export const ListSchema = SchemaFactory.createForClass(List);
