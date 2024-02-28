export interface Files {
  _id: string;
  filename: string;
  path: string;
  size: number;
  folder_id: string;
  owner_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}
export interface Folder {
  _id: string;
  name: string;
  owner_id: string;
  parent_id: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}
export interface FileFolderRelationship {
  _id: string;
  file_id: string;
  folder_id: string;
}
export interface FolderPermission {
  _id: string;
  folder_id: string;
  user_id: string;
  can_read: boolean;
  can_write: boolean;
  can_delete: boolean;
  created_at: string;
  updated_at: string;
}
export interface FilePermission {
  _id: string;
  file_id: number;
  user_id: number;
  can_read: boolean;
  can_write: boolean;
  can_delete: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}
