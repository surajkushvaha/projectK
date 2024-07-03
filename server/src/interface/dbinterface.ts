export interface FolderSystem {
  _id: string;
  name: string;
  parent: string | null;
  ownerId: string;
  sharedWith: SharedWith[];
  publicAccess: PublicAccess;
  createdAt: string;
  updatedAt: string;
}

export interface SharedWith {
  userId?: string;
  roleId?: string; // Reference to the role
}

export interface PublicAccess {
  isPublic: boolean;
  roleId?: string; // Reference to the role
}

export interface FileSystem {
  _id: string;
  name: string;
  folderId: string;
  ownerId: string;
  sharedWith: SharedWith[];
  publicAccess: PublicAccess;
  path: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  roleId: string; // Reference to the role
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  _id: string;
  name: string;
  permissions: Permissions;
  createdAt: string;
  updatedAt: string;
}

export interface Permissions {
  canViewFolder: boolean;
  canViewFile: boolean;
  canCreateFolder: boolean;
  canCreateFile: boolean;
  canDeleteFolder: boolean;
  canDeleteFile: boolean;
  canRenameFolder: boolean;
  canRenameFile: boolean;
  canUploadFile: boolean;
  canUploadFolder: boolean;
  canDownloadFile: boolean;
  canDownloadFolder: boolean;
}

export type PermissionKeys = keyof Permissions;

export interface APIResponse {
  success: boolean;
  message: string;
  data?: any;
}
