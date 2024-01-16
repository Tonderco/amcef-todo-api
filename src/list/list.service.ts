import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { List } from './schemas/list.schema';
import { User } from '../auth/schemas/user.schema';
import { ListItem } from '../list-item/schemas/list-item.schema';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name)
    private listModel: mongoose.Model<List>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<List[]> {
    return this.listModel.find();
  }

  async create(list: List, user: User): Promise<List> {
    const data: { name: string; users: User[] } = {
      name: list.name,
      users: [user],
    };
    return this.listModel.create(data);
  }

  async findById(id: string): Promise<List> {
    const isValidId: boolean = mongoose.isValidObjectId(id);

    if (!isValidId) {
      console.log('BAD REQUEST EXCEPTION IN LIST SERVICE FIND BY ID FUNCTION');
      throw new BadRequestException('Please enter the correct id format');
    }

    const list: List = await this.listModel.findById(id);

    if (!list) {
      console.log('NOT FOUND EXCEPTION IN LIST SERVICE FIND BY ID FUNCTION');
      throw new NotFoundException('List not found');
    }

    return list;
  }

  async updateById(id: string, list: List, user: User): Promise<List> {
    if ((await this.isOwner(user, id)) === false) {
      throw new UnauthorizedException('You are not an owner of this list');
    }

    return this.listModel.findByIdAndUpdate(id, list, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string, user: User): Promise<List> {
    if ((await this.isOwner(user, id)) === false) {
      throw new UnauthorizedException('You are not an owner of this list');
    }

    return this.listModel.findByIdAndDelete(id);
  }

  async addOwnerToList(id: string, user: User, email: string): Promise<List> {
    if ((await this.isOwner(user, id)) === false) {
      throw new UnauthorizedException('You are not an owner of this list');
    }

    const newUser: User = await this.userModel.findOne({ email: email });
    if (!newUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    const list = await this.listModel.findById(id);
    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }

    const isAlreadyUser = list.users.some((u: User) =>
      u._id.equals(newUser._id),
    );

    if (!isAlreadyUser) {
      list.users.push(newUser);
      await list.save();
    } else {
      throw new BadRequestException(
        `User with email ${email} is already an owner of the list`,
      );
    }

    return list;
  }

  async isOwner(user: User, id: string): Promise<boolean> {
    const list: List = await this.listModel.findById(id);
    return list.users.some((listUser) => listUser._id.equals(user._id));
  }

  async addListItem(listId: string, newListItem: ListItem): Promise<List> {
    const list = await this.listModel.findById(listId);
    if (!list) {
      throw new NotFoundException(`List with ID ${listId} not found`);
    }

    const listItemIndex = list.listItems.findIndex((item) =>
      item._id.equals(newListItem._id),
    );

    if (listItemIndex > -1) {
      list.listItems[listItemIndex] = newListItem;
    } else {
      list.listItems.push(newListItem);
    }

    await list.save();
    return list;
  }
}
