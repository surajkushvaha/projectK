import { Injectable } from '@nestjs/common';
import { APIResponse, User } from 'src/interface/dbinterface';
import { getRoleList } from 'src/middleware/roles';
import { addUser, getUserByEmailAndPassword } from 'src/middleware/users';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FolderService {

}
