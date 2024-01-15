import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ListItem } from './schemas/list-item.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ListItemService {
  constructor(
    @InjectModel(ListItem.name)
    private listItemModel: mongoose.Model<ListItem>,
  ) {}

  async findAll(): Promise<ListItem[]> {
    return this.listItemModel.find();
  }
}
