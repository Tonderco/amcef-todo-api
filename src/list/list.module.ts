import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from './schemas/list.schema';
import { AuthModule } from '../auth/auth.module';
import { ListItemModule } from '../list-item/list-item.module';

@Module({
  imports: [
    AuthModule,
    ListItemModule,
    MongooseModule.forFeature([{ name: 'List', schema: ListSchema }]),
  ],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListModule],
})
export class ListModule {}
