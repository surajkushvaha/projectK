import {
  FileSystem,
  FolderSystem,
  User,
  Role,
  APIResponse,
} from 'src/interface/dbinterface';

const validateFields = (object: any, requiredFields: string[]): APIResponse => {
  for (const field of requiredFields) {
    if (
      object[field] === undefined ||
      object[field] === null ||
      object[field] === ''
    ) {
      return {
        success: false,
        message: `Field ${field} is required and cannot be empty.`,
      };
    }
    if (Array.isArray(object[field]) && object[field].length === 0) {
      return {
        success: false,
        message: `Field ${field} cannot be an empty array.`,
      };
    }
  }
  return {
    success: true,
    message: 'Validation successful',
  };
};

const validateFileSystem = (file: FileSystem): APIResponse => {
  const requiredFields = [
    '_id',
    'name',
    'folderId',
    'ownerId',
    'path',
    'size',
    'createdAt',
    'updatedAt',
  ];
  return validateFields(file, requiredFields);
};

const validateFolderSystem = (folder: FolderSystem): APIResponse => {
  const requiredFields = ['_id', 'name', 'ownerId', 'createdAt', 'updatedAt'];
  return validateFields(folder, requiredFields);
};

const validateUser = (user: User): APIResponse => {
  const requiredFields = [
    '_id',
    'username',
    'email',
    'password',
    'roleId',
    'createdAt',
    'updatedAt',
  ];
  return validateFields(user, requiredFields);
};

const validateRole = (role: Role): APIResponse => {
  const requiredFields = [
    '_id',
    'name',
    'permissions',
    'createdAt',
    'updatedAt',
  ];
  return validateFields(role, requiredFields);
};

export { validateFileSystem, validateFolderSystem, validateUser, validateRole };
