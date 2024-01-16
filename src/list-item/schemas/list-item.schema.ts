import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ItemListFlag {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

@Schema({
  timestamps: true,
})
export class ListItem extends Document {
  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  deadline: string;

  @Prop()
  creator: string;

  @Prop()
  listID: string;

  @Prop()
  flag: ItemListFlag;
}

export const ListItemSchema = SchemaFactory.createForClass(ListItem);
