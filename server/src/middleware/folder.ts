import { APIResponse, FolderSystem } from 'src/interface/dbinterface';
import { refreshDatabase, getDatabase, saveDatabase } from './common';
import { deleteFileById, getFilesByFolderId } from './files';
import { APP_CONSTANTS } from 'src/constants/app.constants';
import { logger } from './logger';
import { validateFolderSystem } from './validators';
import { v4 as uuidv4 } from 'uuid';

let folders: FolderSystem[] = [];

const setFoldersData = () => {
  refreshDatabase();
  const db = getDatabase(APP_CONSTANTS.DATABASES.FOLDERSDB);

  if (db.success && db.data?.length) {
    try {
      if (typeof db.data == 'string') {
        folders = JSON.parse(db.data);
      } else {
        folders = db.data;
      }
      logger.info('All folder retrieved from database.');
    } catch (error: any) {
      logger.error('Error parsing database data:');
      logger.error(error.message);
    }
  }
};

const updateFoldersData = () => {
  const updatedFoldersData = folders;
  saveDatabase(APP_CONSTANTS.DATABASES.FOLDERSDB, updatedFoldersData);
  setFoldersData();
};

const isFolderUnique = (
  foldername: string,
  currentParentFolderId: string | null,
): boolean => {
  setFoldersData();
  return !folders.find(
    (folder) =>
      folder.name === foldername && folder.parent === currentParentFolderId,
  );
};

const setNewFolderData = (data: FolderSystem): APIResponse => {
  const validationResponse = validateFolderSystem(data);
  if (!validationResponse.success) {
    return validationResponse;
  }
  setFoldersData();
  if (!isFolderUnique(data.name, data.parent)) {
    logger.alert(
      'Folder with the same name already exists in the parent directory.',
    );
    return {
      success: false,
      message:
        'Folder with the same name already exists in the parent directory.',
    };
  }
  folders.push(data);
  updateFoldersData();
  logger.success('Folder added successfully');
  return {
    success: true,
    message: 'Folder added successfully',
  };
};

const updateFolderById = (
  folderId: string,
  newData: FolderSystem,
): APIResponse => {
  const validationResponse = validateFolderSystem(newData);
  if (!validationResponse.success) {
    return validationResponse;
  }
  setFoldersData();
  const folderIndex = folders.findIndex((folder) => folder._id === folderId);
  if (folderIndex !== -1) {
    if (
      newData.name &&
      newData.parent &&
      !isFolderUnique(newData.name, newData.parent)
    ) {
      logger.alert(
        'Folder with the same name already exists in the parent directory.',
      );
      return {
        success: false,
        message:
          'Folder with the same name already exists in the parent directory.',
      };
    }
    folders[folderIndex] = { ...folders[folderIndex], ...newData };
    updateFoldersData();
    logger.success('Folder updated successfully');
    return { success: true, message: 'Folder updated successfully' };
  } else {
    logger.alert('Folder not found.');
    return { success: false, message: 'Folder not found' };
  }
};

const getFolderById = (folderId: string): FolderSystem | undefined => {
  setFoldersData();
  return folders.find((folder) => folder._id === folderId);
};

const getFoldersByAuthorId = (owner_id: string): FolderSystem[] | undefined => {
  setFoldersData();
  return folders.filter((folder) => folder.ownerId === owner_id);
};

const getFolderList = () => {
  setFoldersData();
  return folders;
};

const deleteFolderById = (folderId: string): APIResponse => {
  setFoldersData();
  try {
    const folderIndex = folders.findIndex((folder) => folder._id === folderId);
    if (folderIndex !== -1) {
      const deletedFolder = folders.splice(folderIndex, 1)[0];
      getFilesByFolderId(folderId)?.forEach((file) => deleteFileById(file._id));
      updateFoldersData();
      logger.success('Folder deleted successfully');
      return {
        success: true,
        message: 'Folder deleted successfully',
        data: deletedFolder,
      };
    } else {
      logger.alert('Folder not found.');
      return { success: false, message: 'Folder not found' };
    }
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};

const getSubfolders = (parentFolderId: string) => {
  setFoldersData();
  return folders.filter((folder) => folder.parent === parentFolderId);
};

const getFolderPath = (folderId: string): string[] => {
  const path: any[] = [];

  const findFolderPath = (id: string) => {
    const folder = getFolderById(id);
    if (!folder) {
      return;
    }

    path.unshift({
      id: folder._id,
      name: folder.name,
    });
    if (folder.parent) {
      findFolderPath(folder.parent);
    }
  };

  findFolderPath(folderId);
  return path;
};

const moveFolderToAnotherFolder = (
  folderId: string,
  newParentFolderId: string,
): APIResponse => {
  const folder = getFolderById(folderId);
  if (!folder) {
    return { success: false, message: 'Folder not found' };
  }

  folder.parent = newParentFolderId;
  updateFolderById(folderId, folder);

  const subfolders = getSubfolders(folderId);
  subfolders.forEach((subfolder) =>
    moveFolderToAnotherFolder(subfolder._id, folderId),
  );

  return { success: true, message: 'Folder moved successfully' };
};

const copyFolderToAnotherFolder = (
  folderId: string,
  newParentFolderId: string,
): APIResponse => {
  const folder = getFolderById(folderId);
  if (!folder) {
    return { success: false, message: 'Folder not found' };
  }

  const newFolder = {
    ...folder,
    _id: uuidv4(),
    parent: newParentFolderId,
  };
  setNewFolderData(newFolder);

  const subfolders = getSubfolders(folderId);
  subfolders.forEach((subfolder) =>
    copyFolderToAnotherFolder(subfolder._id, newFolder._id),
  );

  return { success: true, message: 'Folder copied successfully' };
};

export {
  getFoldersByAuthorId,
  getFolderById,
  getFolderList,
  isFolderUnique,
  setNewFolderData,
  deleteFolderById,
  updateFolderById,
  getSubfolders,
  getFolderPath,
  moveFolderToAnotherFolder,
  copyFolderToAnotherFolder,
};
