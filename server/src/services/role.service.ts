import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { APIResponse, Role } from 'src/interface/dbinterface';
import { getRoleList, setNewRoleData } from 'src/middleware/roles';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RoleService {
  getAllRoles(): APIResponse {
    const rolelist: Role[] = getRoleList();
    if (!rolelist?.length) {
      return {
        success: false,
        message: 'no roles found',
        data: [],
      };
    }
    return {
      success: true,
      message: 'successfully retrieved all roles',
      data: rolelist,
    };
  }
  createRole(role: Role): APIResponse {
    return setNewRoleData({
      _id: uuidv4(),
      name: role.name,
      permissions: {
        canCreateFile: role.permissions.canCreateFile || false,
        canCreateFolder: role.permissions.canCreateFolder || false,
        canDeleteFile: role.permissions.canDeleteFile || false,
        canDeleteFolder: role.permissions.canDeleteFolder || false,
        canViewFile: role.permissions.canViewFile || false,
        canViewFolder: role.permissions.canViewFolder || false,
        canDownloadFile: role.permissions.canDownloadFile || false,
        canDownloadFolder: role.permissions.canDownloadFolder || false,
        canRenameFile: role.permissions.canRenameFile || false,
        canRenameFolder: role.permissions.canRenameFolder || false,
        canUploadFile: role.permissions.canUploadFile || false,
        canUploadFolder: role.permissions.canUploadFolder || false,
      },
      createdAt: moment().format(),
      updatedAt: moment().format(),
    });
  }
}
