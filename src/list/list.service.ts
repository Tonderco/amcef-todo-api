import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { List } from './schemas/list.schema';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name)
    private listModel: mongoose.Model<List>,
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

  async updateById(id: string, list: List): Promise<List> {
    return this.listModel.findByIdAndUpdate(id, list, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<List> {
    return this.listModel.findByIdAndDelete(id);
  }
}
