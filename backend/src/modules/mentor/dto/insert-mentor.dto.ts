import { SocialPlatform } from '@constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SocialDto {
  @ApiProperty({ description: 'Social contact', required: true })
  @IsNotEmpty()
  @IsEnum(SocialPlatform)
  name: string;

  @ApiProperty({ description: 'Social contact', required: true })
  @IsNotEmpty()
  @IsString()
  link: string;
}

export class InsertMentorDto {
  @ApiProperty({ description: 'The name of the mentor', required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The name of the mentor',
    required: false,
    isArray: true,
    type: SocialDto,
  })
  @IsOptional()
  @Type(() => SocialDto)
  @IsArray()
  @ValidateNested()
  socials: SocialDto[];

  @ApiProperty({
    description: 'The nationality of the mentor',
    required: false,
  })
  @IsOptional()
  @IsString()
  nationality: string;

  @ApiProperty({ description: 'The name of the agency', required: false })
  @IsOptional()
  @IsString()
  agency: string;

  @ApiProperty({ description: 'The name of the school', required: false })
  @IsOptional()
  @IsString()
  school: string;

  @ApiProperty({ description: 'Information about the mentor', required: true })
  @IsNotEmpty()
  @IsString()
  about: string;

  @ApiProperty({
    description: 'Mentor email address for meeting',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mentor position',
    required: false,
  })
  @IsOptional()
  @IsString()
  position: string;

  @ApiProperty({ description: 'The major of mentor', required: true })
  @IsNotEmpty()
  @IsString({ each: true })
  majors: string[];

  @ApiProperty({ description: 'Skills of the mentor', required: true })
  @IsNotEmpty()
  @IsString()
  skills: string;

  @ApiProperty({ description: 'Avatar of the mentor', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;
}
