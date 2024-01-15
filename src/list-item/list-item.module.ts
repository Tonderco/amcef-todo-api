import { Module } from '@nestjs/common';
import { ListItemController } from './list-item.controller';
import { ListItemService } from './list-item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListItemSchema } from './schemas/list-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ListItem', schema: ListItemSchema }]),
  ],
  controllers: [ListItemController],
  providers: [ListItemService],
})
export class ListItemModule {}
