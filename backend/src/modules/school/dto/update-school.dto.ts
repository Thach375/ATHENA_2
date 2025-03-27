import { PartialType } from '@nestjs/swagger';
import { InsertSchoolDto } from './insert-school.dto';

export class UpdateSchoolDto extends PartialType(InsertSchoolDto) {}
