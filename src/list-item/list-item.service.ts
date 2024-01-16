import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ItemListFlag, ListItem } from './schemas/list-item.schema';
import * as mongoose from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { ListService } from '../list/list.service';

@Injectable()
export class ListItemService {
  constructor(
    @InjectModel(ListItem.name)
    private listItemModel: mongoose.Model<ListItem>,
    private listService: ListService,
  ) {}

  async findAll(): Promise<ListItem[]> {
    return this.listItemModel.find();
  }

  async create(
    listItem: ListItem,
    user: User,
    listID: string,
  ): Promise<ListItem> {
    const isValidId: boolean = mongoose.isValidObjectId(listID);

    if (!isValidId) {
      console.log('BAD REQUEST EXCEPTION IN LIST SERVICE FIND BY ID FUNCTION');
      throw new BadRequestException('Please enter the correct id format');
    }

    if ((await this.listService.isOwner(user, listID)) === false) {
      throw new UnauthorizedException('You are not an owner of this list');
    }

    const data: {
      title: string;
      text: string;
      deadline: string;
      creator: string;
      listID: string;
      flag: ItemListFlag;
    } = {
      title: listItem.title,
      text: listItem.text,
      deadline: listItem.deadline,
      creator: user.email,
      listID: listID,
      flag: listItem.flag ?? ItemListFlag.ACTIVE,
    };

    const createdListItem: ListItem = await this.listItemModel.create(data);

    await this.listService.addListItem(listID, createdListItem);

    return createdListItem;
  }

  async setFlag(
    listItem: ListItem,
    user: User,
    listID: string,
    listItemID: string,
  ): Promise<ListItem> {
    const isValidListId: boolean = mongoose.isValidObjectId(listID);
    const isValidListItemId: boolean = mongoose.isValidObjectId(listID);

    if (!isValidListId) {
      console.log('BAD REQUEST EXCEPTION IN LIST SERVICE FIND BY ID FUNCTION');
      throw new BadRequestException('Please enter the correct list id format');
    } else if (!isValidListItemId) {
      console.log('BAD REQUEST EXCEPTION IN LIST SERVICE FIND BY ID FUNCTION');
      throw new BadRequestException(
        'Please enter the correct list item id format',
      );
    }

    if ((await this.listService.isOwner(user, listID)) === false) {
      throw new UnauthorizedException('You are not an owner of this list');
    }

    const updatedListItem: ListItem = await this.listItemModel
      .findByIdAndUpdate(listItemID, listItem, { new: true })
      .exec();

    await this.listService.addListItem(listID, updatedListItem);

    return updatedListItem;
  }
}
