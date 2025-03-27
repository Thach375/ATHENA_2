import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ImageValidator implements PipeTransform {
  transform(value: any) {
    const ext = value.originalname.split('.').pop();
    if (!['jpg', 'png', 'jpeg'].includes(ext)) {
      throw new BadRequestException(`upload.MIME_TYPE_NOT_SUPPORTED`);
    }

    return value;
  }
}
