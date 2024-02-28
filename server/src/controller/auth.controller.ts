import { Body, Controller, Post } from '@nestjs/common';
import { APP_CONSTANTS } from 'src/constants/app.constants';
import { User } from 'src/interface/dbinterface';
import { refreshDatabase } from 'src/middleware/common';
import { addUser } from 'src/middleware/users';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(APP_CONSTANTS.PATH.LOGIN)
  loginApp(@Body() body: any) {
    return this.authService.getLogin(body.username, body.password);
  }

  @Post(APP_CONSTANTS.PATH.SIGNUP)
  signupApp(@Body() body: any) {
    refreshDatabase();
    if (body.username && body.password && body.password) {
      const user: User = {
        _id: '',
        username: body.username,
        email: body.email,
        password: body.password,
        created_at: new Date().toString(),
        updated_at: new Date().toString(),
      };
      return addUser(user);
    }
    return {
      success: false,
      message: 'invalid input data format',
    };
  }
}
