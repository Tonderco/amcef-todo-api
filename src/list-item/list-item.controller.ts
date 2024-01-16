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
import { ListItemService } from './list-item.service';
import { ListItem } from './schemas/list-item.schema';
import { AuthGuard } from '@nestjs/passport';
import { CreateListItemDto } from './dto/create-list-item-dto';
import { UpdateListItemDto } from './dto/update-list-item-dto';

@Controller('list-items')
export class ListItemController {
  constructor(private listItemService: ListItemService) {}

  @Get()
  async getAllListItems(): Promise<ListItem[]> {
    return this.listItemService.findAll();
  }

  @Post(':listID')
  @UseGuards(AuthGuard())
  async createListItem(
    @Body() listItem: CreateListItemDto,
    @Req() req: any,
    @Param('listID') listID: string,
  ): Promise<ListItem> {
    return this.listItemService.create(listItem as ListItem, req.user, listID);
  }

  @Put(':listID/:listItemID/set-flag')
  @UseGuards(AuthGuard())
  async setListItemFlag(
    @Body() listItem: UpdateListItemDto,
    @Req() req: any,
    @Param('listID') listID: string,
    @Param('listItemID') listItemID: string,
  ): Promise<ListItem> {
    return this.listItemService.updateListItem(
      listItem as ListItem,
      req.user,
      listID,
      listItemID,
    );
  }

  @Put(':listID/:listItemID')
  @UseGuards(AuthGuard())
  async updateListItem(
    @Body() listItem: UpdateListItemDto,
    @Req() req: any,
    @Param('listID') listID: string,
    @Param('listItemID') listItemID: string,
  ): Promise<ListItem> {
    return this.listItemService.updateListItem(
      listItem as ListItem,
      req.user,
      listID,
      listItemID,
    );
  }

  @Delete(':listID/:listItemID')
  @UseGuards(AuthGuard())
  async deleteListItem(
    @Req() req: any,
    @Param('listID') listID: string,
    @Param('listItemID') listItemID: string,
  ): Promise<ListItem> {
    return this.listItemService.deleteListItem(req.user, listID, listItemID);
  }
}
