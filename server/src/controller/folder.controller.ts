import { Body, Controller, Post } from '@nestjs/common';
import { APP_CONSTANTS } from 'src/constants/app.constants';
import { APIResponse } from 'src/interface/dbinterface';
import { refreshDatabase } from 'src/middleware/common';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class FolderController {
  constructor(private readonly authService: AuthService) {}

  @Post(APP_CONSTANTS.PATH.LOGIN)
  loginApp(@Body() body: any): APIResponse {
    if (body.email && body.password) {
      return this.authService.getLogin(body.email, body.password);
    }
    return {
      success: false,
      message: 'Invalid request format',
    };
  }

  @Post(APP_CONSTANTS.PATH.SIGNUP)
  signupApp(@Body() body: any): APIResponse {
    refreshDatabase();
    if (body.username && body.password && body.email) {
      return this.authService.createUser(body);
    }
    return {
      success: false,
      message: 'invalid input data format',
    };
  }
}
