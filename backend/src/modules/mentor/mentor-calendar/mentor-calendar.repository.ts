import { AppObject } from '@constants/object';
import { MongooseRepository } from '@database/mongoose.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MentorCalendar } from './mentor-calendar.schema';

export class MentorCalendarRepository extends MongooseRepository<MentorCalendar> {
  constructor(
    @InjectModel(AppObject.COLLECTIONS.MENTOR_CALENDAR)
    private readonly mentorCalendarModel: Model<MentorCalendar>,
  ) {
    super(mentorCalendarModel);
  }
}
