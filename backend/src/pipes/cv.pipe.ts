import { BadRequestException, PipeTransform } from '@nestjs/common';

export class CvValidator implements PipeTransform {
  transform(value: any) {
    const ext = value.originalname.split('.').pop();
    if (!['pdf', 'doc', 'docx'].includes(ext)) {
      throw new BadRequestException(`upload.MIME_TYPE_NOT_SUPPORTED`);
    }

    return value;
  }
}
