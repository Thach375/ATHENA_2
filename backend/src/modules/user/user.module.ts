import { AppObject } from '@constants/object';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { AdminModule } from '@modules/admin/admin.module';
import { ProfileSchema } from './profile/profile.schema';
import { ProfileRepository } from './profile/profile.repository';
import { ChanceLogModule } from '@modules/chance-logs/chance-log.module';
import { SchoolSchema } from '@modules/school/school.schema';
import { SchoolRepository } from '@modules/school/school.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppObject.COLLECTIONS.USER, schema: UserSchema },
      { name: AppObject.COLLECTIONS.PROFILE, schema: ProfileSchema },
      { name: AppObject.COLLECTIONS.SCHOOL, schema: SchoolSchema },
    ]),
    AdminModule,
    ChanceLogModule,
  ],
  exports: [UserService],
  providers: [UserService, UserRepository, ProfileRepository, SchoolRepository],
  controllers: [UserController],
})
export class UserModule {}
