import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class InsertSchoolDto {
  @ApiProperty({
    name: 'name',
    description: "school's name",
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    name: 'address',
    description: "school's address",
    required: true,
  })
  @IsString()
  address: string;

  @ApiProperty({
    name: 'country',
    description: "school's country",
    required: true,
  })
  @IsString()
  country: string;

  @ApiProperty({
    name: 'image',
    description: "school's avatar",
    required: false,
  })
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({
    name: 'banner',
    description: "school's banner",
    required: false,
  })
  @IsOptional()
  @IsString()
  banner: string;

  @ApiProperty({
    name: 'undergrads',
    description: "school's undergrads",
    required: false,
  })
  @IsOptional()
  @IsInt()
  undergrads?: number;

  @ApiProperty({
    name: 'description',
    description: "school's overview",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    name: 'cost',
    description: "school's cost per year",
    required: false,
  })
  @IsOptional()
  @IsInt()
  cost?: number;

  @ApiProperty({
    name: 'majors',
    description: "school's overview",
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  majors?: string[];
}
