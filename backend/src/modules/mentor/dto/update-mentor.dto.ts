import { PartialType } from '@nestjs/mapped-types';
import { InsertMentorDto } from './insert-mentor.dto';

export class UpdateMentorDto extends PartialType(InsertMentorDto) {}
