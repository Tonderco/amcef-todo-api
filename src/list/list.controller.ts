import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ListService } from './list.service';
import { List } from './schemas/list.schema';
import { CreateListDto } from './dto/create-list-dto';
import { UpdateListDto } from './dto/update-list-dto';
import { AuthGuard } from '@nestjs/passport';
import { AddOwnerDto } from './dto/add-owner-dto';

@Controller('lists')
export class ListController {
  constructor(private listService: ListService) {}

  @Get()
  async getAllLists(): Promise<List[]> {
    return this.listService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createList(
    @Body() list: CreateListDto,
    @Req() req: any,
  ): Promise<List> {
    return this.listService.create(list as List, req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getList(@Param('id') id: string): Promise<List> {
    return this.listService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateList(
    @Param('id') id: string,
    @Body() list: UpdateListDto,
    @Req() req: any,
  ): Promise<List> {
    return this.listService.updateById(id, list as List, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteList(@Param('id') id: string, @Req() req: any): Promise<List> {
    return this.listService.deleteById(id, req.user);
  }

  @Put(':id/add-owner')
  @UseGuards(AuthGuard())
  async addUser(
    @Param('id') id: string,
    @Req() req: any,
    @Body() body: AddOwnerDto,
  ): Promise<List> {
    return this.listService.addOwnerToList(id, req.user, body.email);
  }
}
