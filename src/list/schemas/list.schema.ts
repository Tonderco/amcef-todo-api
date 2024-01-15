import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class List {
  @Prop()
  name: string;
}

export const ListSchema = SchemaFactory.createForClass(List);
