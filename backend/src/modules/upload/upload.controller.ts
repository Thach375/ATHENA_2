import { MAXIMUM_CV_SIZE, MAXIMUM_IMAGE_SIZE } from '@constants/variable';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorate';
import { ImageValidator } from 'src/pipes/image.pipe';
import { UploadService } from './upload.service';
import { CvValidator } from 'src/pipes/cv.pipe';

@Controller()
@ApiTags('Upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Auth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        cv: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/upload/cv')
  @UseInterceptors(
    FileInterceptor('cv', { limits: { fileSize: MAXIMUM_CV_SIZE } }),
  )
  @UsePipes(CvValidator)
  public async uploadCV(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return this.uploadService.upload(file, 'raw');
  }

  @Auth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/upload/image')
  @UseInterceptors(
    FileInterceptor('image', { limits: { fileSize: MAXIMUM_IMAGE_SIZE } }),
  )
  @UsePipes(ImageValidator)
  public async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return this.uploadService.upload(file, 'image');
  }
}
