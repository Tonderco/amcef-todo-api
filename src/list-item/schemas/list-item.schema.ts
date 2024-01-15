import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum ItemListFlag {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

@Schema({
  timestamps: true,
})
export class ListItem {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  deadline: Date;

  @Prop()
  creator: string;

  @Prop()
  flag: ItemListFlag;
}

export const ListItemSchema = SchemaFactory.createForClass(ListItem);
