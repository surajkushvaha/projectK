import { Body, Controller, Post } from '@nestjs/common';
import { APP_CONSTANTS } from 'src/constants/app.constants';
import { APIResponse } from 'src/interface/dbinterface';
import { FileService } from 'src/services/file.service';

@Controller(APP_CONSTANTS.PATH.FILES)
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post(APP_CONSTANTS.PATH.FILEUPLOAD)
  uploadFile(@Body() body: any): Promise<APIResponse> {
    return this.fileService.uploadFile(body);
  }
}
