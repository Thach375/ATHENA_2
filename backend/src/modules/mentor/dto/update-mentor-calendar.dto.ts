import { PartialType } from '@nestjs/swagger';
import { InsertMentorCalendarDto } from './insert-mentor-calendar.dto';

export class UpdateMentorCalendarDto extends PartialType(
  InsertMentorCalendarDto,
) {}
