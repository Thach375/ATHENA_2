import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateCourseWorkDto {
  @ApiProperty({
    type: Number,
    description: 'Honors score, if applicable.',
    required: false,
  })
  @IsInt()
  @IsOptional()
  honors?: number;

  @ApiProperty({
    type: Number,
    description: 'College courses',
    required: false,
  })
  @IsInt()
  @IsOptional()
  collegeCourse?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of school AP/IB courses',
    required: false,
  })
  @IsInt()
  @IsOptional()
  schoolAP?: number;

  @ApiProperty({
    type: Number,
    description: 'Advanced Placement (AP) score, if applicable.',
    required: false,
  })
  @IsInt()
  @IsOptional()
  AP?: number;

  @ApiProperty({
    type: Number,
    description:
      'International Baccalaureate Higher Level (IBHL) score, if applicable.',
    required: false,
  })
  @IsInt()
  @IsOptional()
  IBHL?: number;

  @ApiProperty({
    type: Number,
    description:
      'International Baccalaureate Standard Level (IBSL) score, if applicable.',
    required: false,
  })
  @IsInt()
  @IsOptional()
  IBSL?: number;

  @ApiProperty({
    type: Number,
    description:
      'General Certificate of Secondary Education (GCSE) or International General Certificate of Secondary Education (IGCSE) score, if applicable.',
    required: false,
  })
  @IsInt()
  @IsOptional()
  GCSE_IGCSE?: number;

  @ApiProperty({
    type: Number,
    description:
      'Advanced International Certificate of Education (AICE) score, if applicable.',
    required: false,
  })
  @IsInt()
  @IsOptional()
  AICE?: number;

  @ApiProperty({
    type: Number,
    description:
      'Central Board of Secondary Education (CBSE) score, if applicable.',
    required: false,
  })
  @IsInt()
  @IsOptional()
  CBSE?: number;
}
