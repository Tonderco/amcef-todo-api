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
    return this.listService.create(list, req.user);
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
  ): Promise<List> {
    return this.listService.updateById(id, list);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteList(@Param('id') id: string): Promise<List> {
    return this.listService.deleteById(id);
  }
}
