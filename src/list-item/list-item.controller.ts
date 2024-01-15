import { Controller, Get } from '@nestjs/common';
import { ListItemService } from './list-item.service';
import { ListItem } from './schemas/list-item.schema';

@Controller('list-items')
export class ListItemController {
  constructor(private listItemService: ListItemService) {}

  @Get()
  async getAllListItems(): Promise<ListItem[]> {
    return this.listItemService.findAll();
  }
}
