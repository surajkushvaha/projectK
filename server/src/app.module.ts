import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { FileController } from './controller/file.controller';
import { FileService } from './services/file.service';
import { FolderService } from './services/folder.service';
import { RoleService } from './services/role.service';
import { RoleController } from './controller/role.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, FileController, RoleController],
  providers: [AuthService, AppService, FileService, FolderService, RoleService],
})
export class AppModule {}
