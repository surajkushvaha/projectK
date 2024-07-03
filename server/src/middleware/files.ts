import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { refreshDatabase, getDatabase, saveDatabase } from './common';
import { FileSystem, APIResponse } from 'src/interface/dbinterface';
import { APP_CONSTANTS } from 'src/constants/app.constants';
import { logger } from './logger';
import { validateFileSystem } from './validators';

let files: FileSystem[] = [];

const setFilesData = (): void => {
  refreshDatabase();
  logger.info('Getting all files from database...');
  const db = getDatabase(APP_CONSTANTS.DATABASES.FILESDB);

  if (db.success && db.data?.length) {
    try {
      if (typeof db.data == 'string') {
        files = JSON.parse(db.data);
      } else {
        files = db.data;
      }
      logger.info('All files retrieved from database.');
    } catch (error: any) {
      logger.error('Error parsing database data');
      logger.error(error.message);
    }
  }
};

const updateFilesData = (): void => {
  saveDatabase(APP_CONSTANTS.DATABASES.FILESDB, files);
  setFilesData();
};

const setNewFileData = (data: FileSystem): APIResponse => {
  const validationResponse = validateFileSystem(data);
  if (!validationResponse.success) {
    return validationResponse;
  }
  if (!isFileUnique(data.name, data.folderId)) {
    logger.alert(
      'File with the same name already exists in the parent directory.',
    );
    return {
      success: false,
      message:
        'File with the same name already exists in the parent directory.',
    };
  }
  setFilesData();
  files.push(data);
  updateFilesData();
  logger.success('File added successfully');
  return {
    success: true,
    message: 'File added successfully',
  };
};

const isFileUnique = (filename: string, parentFolderId: string): boolean => {
  setFilesData();
  return !files.find(
    (file) => file.name === filename && file.folderId === parentFolderId,
  );
};

const getFileById = (fileId: string): FileSystem | undefined => {
  setFilesData();
  return files.find((file) => file._id === fileId);
};

const getFilesByAuthorId = (ownerId: string): FileSystem[] => {
  setFilesData();
  return files.filter((file) => file.ownerId === ownerId);
};

const getFilesByFolderId = (folderId: string): FileSystem[] => {
  setFilesData();
  return files.filter((file) => file.folderId === folderId);
};

const getFilesByAuthorIdAndFolderId = (
  ownerId: string,
  folderId: string,
): FileSystem[] => {
  setFilesData();
  return files.filter(
    (file) => file.ownerId === ownerId && file.folderId === folderId,
  );
};

const getTotalFileSizeByAuthorId = (ownerId: string): number => {
  const authorFiles = getFilesByAuthorId(ownerId);
  return authorFiles.reduce((accumulator, file) => accumulator + file.size, 0);
};

const getTotalFileSizeByAuthorIdAndFolderId = (
  ownerId: string,
  folderId: string,
): number => {
  const authorFolderFiles = getFilesByAuthorIdAndFolderId(ownerId, folderId);
  return authorFolderFiles.reduce(
    (accumulator, file) => accumulator + file.size,
    0,
  );
};

const getFileList = (): FileSystem[] => {
  setFilesData();
  return files;
};

const deleteFileById = (fileId: string): APIResponse => {
  setFilesData();
  try {
    const fileIndex = files.findIndex((file) => file._id === fileId);
    if (fileIndex !== -1) {
      const deletedFile = files.splice(fileIndex, 1)[0];
      updateFilesData();
      fs.unlinkSync(deletedFile.path);
      logger.success('File deleted successfully');
      return {
        success: true,
        message: 'File deleted successfully',
        data: deletedFile,
      };
    } else {
      logger.alert('File not found.');
      return { success: false, message: 'File not found' };
    }
  } catch (err: any) {
    logger.error('Error deleting file.');
    logger.error(err.message);
    return { success: false, message: err.message };
  }
};

const updateFileById = (fileId: string, newData: FileSystem): APIResponse => {
  const validationResponse = validateFileSystem(newData);
  if (!validationResponse.success) {
    return validationResponse;
  }
  setFilesData();
  const fileIndex = files.findIndex((file) => file._id === fileId);
  if (fileIndex !== -1) {
    if (
      newData.name &&
      newData.folderId &&
      !isFileUnique(newData.name, newData.folderId)
    ) {
      logger.alert(
        'File with the same name already exists in the parent directory.',
      );
      return {
        success: false,
        message:
          'File with the same name already exists in the parent directory.',
      };
    }
    files[fileIndex] = { ...files[fileIndex], ...newData };
    updateFilesData();
    logger.success('File updated successfully');
    return { success: true, message: 'File updated successfully' };
  } else {
    logger.alert('File not found.');
    return { success: false, message: 'File not found' };
  }
};

const moveFileToAnotherFolder = (
  fileId: string,
  newFolderId: string,
): FileSystem | null => {
  setFilesData();
  const fileIndex = files.findIndex((file) => file._id === fileId);
  if (fileIndex !== -1) {
    files[fileIndex].folderId = newFolderId;
    updateFilesData();
    return files[fileIndex];
  }
  return null;
};

const copyFileToAnotherFolder = (
  fileId: string,
  newFolderId: string,
): APIResponse => {
  setFilesData();
  const file = getFileById(fileId);
  if (file) {
    const newFile = { ...file, _id: uuidv4(), folderId: newFolderId };
    setNewFileData(newFile);
    logger.success('File copied successfully');
    return {
      success: true,
      message: 'File copied successfully',
      data: newFile,
    };
  } else {
    logger.alert('File not found');
    return { success: false, message: 'File not found' };
  }
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
  setNewFileData,
  deleteFileById,
  updateFileById,
  moveFileToAnotherFolder,
  copyFileToAnotherFolder,
};
