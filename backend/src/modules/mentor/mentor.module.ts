import { AppObject } from '@constants/object';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MentorController } from './mentor.controller';
import { MentorRepository } from './mentor.repository';
import { MentorSchema } from './mentor.schema';
import { MentorService } from './mentor.service';
import { MentorCalendarSchema } from './mentor-calendar/mentor-calendar.schema';
import { MentorCalendarRepository } from './mentor-calendar/mentor-calendar.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppObject.COLLECTIONS.MENTOR, schema: MentorSchema },
      {
        name: AppObject.COLLECTIONS.MENTOR_CALENDAR,
        schema: MentorCalendarSchema,
      },
    ]),
  ],
  providers: [MentorRepository, MentorCalendarRepository, MentorService],
  exports: [MentorService],
  controllers: [MentorController],
})
export class MentorModule {}
