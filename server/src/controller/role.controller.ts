import { Body, Controller, Get, Post } from '@nestjs/common';
import { APP_CONSTANTS, permissionKeys } from 'src/constants/app.constants';
import { APIResponse, PermissionKeys, Role } from 'src/interface/dbinterface';
import { refreshDatabase } from 'src/middleware/common';
import { logger } from 'src/middleware/logger';
import { RoleService } from 'src/services/role.service';
@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(APP_CONSTANTS.PATH.GETROLES)
  getAllRoles(): APIResponse {
    return this.roleService.getAllRoles();
  }

  @Post(APP_CONSTANTS.PATH.CREATEROLE)
  createNewRole(@Body() body: Role): APIResponse {
    refreshDatabase();
    if (body.name && body.permissions) {
      return this.roleService.createRole(body);
    }
    logger.warn('invalid input data format');
    return {
      success: false,
      message: 'invalid input data format',
    };
  }

  @Get(APP_CONSTANTS.PATH.GETPERMISSIONS)
  getPermissions(): PermissionKeys[] {
    return permissionKeys;
  }
}
