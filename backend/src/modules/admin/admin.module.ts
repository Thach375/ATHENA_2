import { AppObject } from '@constants/object';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminSchema } from './admin.schema';
import { AdminService } from './admin.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppObject.COLLECTIONS.ADMIN, schema: AdminSchema },
    ]),
  ],
  providers: [AdminRepository, AdminService],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
