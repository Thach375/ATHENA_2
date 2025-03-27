import { PartialType } from '@nestjs/mapped-types';
import { SaveFounderDto } from './save-founder';

export class UpdateFounderDto extends PartialType(SaveFounderDto) {}
