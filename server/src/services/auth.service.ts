import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getLogin(username: string, password: string) {
    if (username && password) {
      return 'Hello World!';
    }
  }
  getPath(): string {
    return 'path';
  }
}
