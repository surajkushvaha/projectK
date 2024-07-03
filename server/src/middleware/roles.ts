import { APIResponse, Role } from 'src/interface/dbinterface';
import { refreshDatabase, getDatabase, saveDatabase } from './common';
import { APP_CONSTANTS } from 'src/constants/app.constants';
import { logger } from './logger';
import { validateRole } from './validators';

let roles: Role[] = [];

const setRolesData = () => {
  refreshDatabase();
  const db = getDatabase(APP_CONSTANTS.DATABASES.ROLESDB);

  if (db.success && db.data?.length) {
    try {
      if (typeof db.data == 'string') {
        roles = JSON.parse(db.data);
      } else {
        roles = db.data;
      }
      logger.info('All Roles retrieved from database.');
    } catch (error: any) {
      logger.error('Error parsing database data:');
      logger.error(error.message);
    }
  }
};

const updateRolesData = (): void => {
  saveDatabase(APP_CONSTANTS.DATABASES.ROLESDB, roles);
  setRolesData();
};

const setNewRoleData = (data: Role): APIResponse => {
  const validationResponse = validateRole(data);
  if (!validationResponse.success) {
    return validationResponse;
  }

  setRolesData();
  if (!isRoleUnique(data.name)) {
    return {
      success: false,
      message: 'Role with the same name already exists.',
    };
  }
  roles.push(data);
  updateRolesData();
  return {
    success: true,
    message: 'Role added successfully',
  };
};

const isRoleUnique = (roleName: string): boolean => {
  setRolesData();
  return !roles.find((role) => role.name === roleName);
};

const getRoleById = (roleId: string): Role | undefined => {
  setRolesData();
  return roles.find((role) => role._id === roleId);
};

const getRoleList = () => {
  setRolesData();
  return roles;
};

const deleteRoleById = (roleId: string): APIResponse => {
  setRolesData();
  try {
    const roleIndex = roles.findIndex((role) => role._id === roleId);
    if (roleIndex !== -1) {
      const deletedRole = roles.splice(roleIndex, 1)[0];
      updateRolesData();
      logger.success('Role deleted successfully');
      return {
        success: true,
        message: 'Role deleted successfully',
        data: deletedRole,
      };
    } else {
      logger.alert('Role not found.');
      return { success: false, message: 'Role not found' };
    }
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};

const updateRoleById = (roleId: string, newData: Role): APIResponse => {
  const validationResponse = validateRole(newData);
  if (!validationResponse.success) {
    return validationResponse;
  }
  if (!isRoleUnique(newData.name)) {
    return {
      success: false,
      message: 'Role with the same name already exists.',
    };
  }
  setRolesData();
  const roleIndex = roles.findIndex((role) => role._id === roleId);
  if (roleIndex !== -1) {
    roles[roleIndex] = { ...roles[roleIndex], ...newData };
    updateRolesData();
    logger.success('Role updated successfully');
    return { success: true, message: 'Role updated successfully' };
  } else {
    logger.alert('Role not found.');
    return { success: false, message: 'Role not found' };
  }
};

export {
  updateRolesData,
  setNewRoleData,
  isRoleUnique,
  getRoleById,
  getRoleList,
  deleteRoleById,
  updateRoleById,
};
