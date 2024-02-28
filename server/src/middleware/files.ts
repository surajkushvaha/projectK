import { Files } from 'src/interface/dbinterface';
import { refreshDatabase, getDatabase, saveDatabase } from './common';
import * as fs from 'fs';
import { APP_CONSTANTS } from 'src/constants/app.constants';
import { Logger } from '@nestjs/common';

let files: Files[] = [];

const setfiles = () => {
  refreshDatabase();
  Logger.log('getting all files from database...');
  const db = getDatabase(APP_CONSTANTS.DATABASES.FILESDB);

  if (db.success && db.data?.length) {
    try {
      files = JSON.parse(db.data);
      Logger.log('all files got from database...');
    } catch (error) {
      Logger.error(error.message);
    }
  }
};

const updatefiles = () => {
  const updatedfiles = files;
  saveDatabase(APP_CONSTANTS.DATABASES.FILESDB, updatedfiles);
  setfiles();
};

const setNewfiles = (data: Files) => {
  files.push(data);
  updatefiles();
};

const isFileUnique = (filename: string, parentFolderId: string) =>
  !files.find(
    (file) => file.filename === filename && file.folder_id === parentFolderId,
  );

const getFileById = (fileId: string) =>
  files.find((file) => file._id === fileId);

const getFilesByAuthorId = (owner_id: string) =>
  files.filter((file) => file.owner_id === owner_id);

const getFilesByFolderId = (folder_id: string) =>
  files.filter((file) => file.folder_id === folder_id);

const getFilesByAuthorIdAndFolderId = (owner_id: string, folder_id: string) =>
  files.filter(
    (file) => file.owner_id === owner_id && file.folder_id === folder_id,
  );

const getTotalFileSizeByAuthorId = (owner_id: string) => {
  const files = getFilesByAuthorId(owner_id);
  const totalFileSize = files.reduce(
    (accumulator, file) => accumulator + file.size,
    0,
  );
  return totalFileSize;
};

const getTotalFileSizeByAuthorIdAndFolderId = (
  owner_id: string,
  folder_id: string,
) => {
  const files = getFilesByAuthorIdAndFolderId(owner_id, folder_id);
  const totalFileSize = files.reduce(
    (accumulator, file) => accumulator + file.size,
    0,
  );
  return totalFileSize;
};

const getFileList = () => {
  setfiles();
  return files;
};

const deleteFileById = (fileId: string) => {
  try {
    const file = getFileById(fileId);
    const fileIndex = files.findIndex((file) => file._id === fileId);
    if (fileIndex !== -1) {
      files.splice(fileIndex, 1);
      updatefiles();
    } else {
      return { success: false, message: 'File not found' };
    }
    file && fs.unlinkSync(file.path);
    return { success: true, message: 'File deleted successfully' };
  } catch (err) {
    return { success: false, err: err.message };
  }
};

const updateFileById = (fileId: string, newData: Files) => {
  const fileIndex = files.findIndex((file) => file._id === fileId);
  if (fileIndex !== -1) {
    files[fileIndex] = { ...files[fileIndex], ...newData };
    updatefiles();
    return { success: true, message: 'File updated successfully' };
  } else {
    return { success: false, message: 'File not found' };
  }
};

const moveFileToAnotherFolder = (fileId: string, newFolderId: string) => {
  const fileIndex = files.findIndex((file) => file._id === fileId);
  if (fileIndex !== -1) {
    files[fileIndex].folder_id = newFolderId;
    updatefiles();
    return files[fileIndex];
  }
  return null;
};

export {
  getFileList,
  getTotalFileSizeByAuthorIdAndFolderId,
  getTotalFileSizeByAuthorId,
  getFilesByAuthorIdAndFolderId,
  getFilesByAuthorId,
  getFileById,
  getFilesByFolderId,
  isFileUnique,
  setNewfiles,
  deleteFileById,
  updateFileById,
  moveFileToAnotherFolder,
};
