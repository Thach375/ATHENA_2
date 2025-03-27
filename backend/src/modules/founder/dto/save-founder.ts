import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SaveFounderDto {
  @ApiProperty({ description: 'Founder fullname', required: true })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Founder title', required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Founder avatar', required: true })
  @IsNotEmpty()
  @IsString()
  avatar: string;

  @ApiProperty({ description: 'Founder bio', required: true })
  @IsNotEmpty()
  @IsString()
  bio: string;
}
