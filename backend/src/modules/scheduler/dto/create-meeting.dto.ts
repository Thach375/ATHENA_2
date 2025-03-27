import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId } from 'class-validator';

export class CreateMeetingDto {
  @ApiProperty({ description: 'scheduler id', required: true })
  @IsMongoId()
  scheduler: string;

  @ApiProperty({ description: 'meeting start time', required: true })
  @IsInt()
  startTime: number;

  @ApiProperty({ description: 'meeting end time', required: true })
  @IsInt()
  endTime: number;
}
