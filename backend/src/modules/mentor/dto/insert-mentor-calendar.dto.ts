import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsNotEmpty } from 'class-validator';

export class InsertMentorCalendarDto {
  @ApiProperty({ description: "user's id", required: false })
  @IsMongoId()
  userId: string;

  @ApiProperty({ description: 'start date', required: true })
  @IsInt()
  @IsNotEmpty()
  startDate: number;

  @ApiProperty({ description: 'end date', required: true })
  @IsInt()
  @IsNotEmpty()
  endDate: number;
}
