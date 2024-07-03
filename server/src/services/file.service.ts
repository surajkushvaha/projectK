import { Injectable } from '@nestjs/common';
import { APIResponse } from 'src/interface/dbinterface';
import { logger } from 'src/middleware/logger';

@Injectable()
export class FileService {
  async uploadFile(file: Express.Multer.File): Promise<APIResponse> {
    console.log(file);
    logger.success('File uploaded successfully');
    return {
      success: true,
      message: 'File uploaded successfully',
    };
  }
}
