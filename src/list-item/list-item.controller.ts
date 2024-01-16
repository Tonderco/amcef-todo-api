import {
  Body,
  Controller,
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

  @Put(':listID/set-flag/:listItemID')
  @UseGuards(AuthGuard())
  async setListItemFlag(
    @Body() listItem: UpdateListItemDto,
    @Req() req: any,
    @Param('listID') listID: string,
    @Param('listItemID') listItemID: string,
  ): Promise<ListItem> {
    return this.listItemService.setFlag(
      listItem as ListItem,
      req.user,
      listID,
      listItemID,
    );
  }
}
