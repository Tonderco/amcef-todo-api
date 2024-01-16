import { Module } from '@nestjs/common';
import { ListItemController } from './list-item.controller';
import { ListItemService } from './list-item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListItemSchema } from './schemas/list-item.schema';
import { AuthModule } from '../auth/auth.module';
import { ListModule } from '../list/list.module';

@Module({
  imports: [
    AuthModule,
    ListModule,
    MongooseModule.forFeature([{ name: 'ListItem', schema: ListItemSchema }]),
  ],
  controllers: [ListItemController],
  providers: [ListItemService],
})
export class ListItemModule {}
