import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AuthService, AppService],
})
export class AppModule {}
