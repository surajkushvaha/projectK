import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { APIResponse, User } from 'src/interface/dbinterface';
import { getRoleList } from 'src/middleware/roles';
import { addUser, getUserByEmailAndPassword } from 'src/middleware/users';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  getLogin(email: string, password: string): APIResponse {
    return getUserByEmailAndPassword(email, password);
  }
  createUser(user: User): APIResponse {
    return addUser({
      _id: uuidv4(),
      username: user.username,
      email: user.email,
      roleId: getRoleList().filter(
        (role: any) => role.name == 'Administrator',
      )[0]._id,
      password: user.password,
      createdAt: moment().format(),
      updatedAt: moment().format(),
    });
  }
}
