import { Module } from '@nestjs/common';
import { ListItemController } from './list-item.controller';
import { ListItemService } from './list-item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListItemSchema } from './schemas/list-item.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'ListItem', schema: ListItemSchema }]),
  ],
  controllers: [ListItemController],
  providers: [ListItemService],
  exports: [ListItemModule],
})
export class ListItemModule {}
