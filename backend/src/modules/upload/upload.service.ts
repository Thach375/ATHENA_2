import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { randomUUID } from 'crypto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  constructor() {
    cloudinary.config({
      cloud_name: 'deiak6ojl',
      api_key: '451536296424616',
      api_secret: '2eA981z0Kb8DhOqiCDPOhanEb1s',
    });
  }

  public async upload(file: Express.Multer.File, type: string): Promise<any> {
    const filename = randomUUID();
    const filePath = path.join(__dirname, filename);
    try {
      await fs.writeFileSync(filePath, file.buffer);
      const result = await cloudinary.uploader.upload(filePath, {
        access_mode: 'public',
        discard_original_filename: false,
        resource_type: type === 'image' ? 'image' : 'raw',
      });
      return { url: result.secure_url };
    } catch (err) {
      throw new BadRequestException(`upload.UPLOAD_ERROR`);
    } finally {
      await fs.rmSync(filePath);
    }
  }
}
