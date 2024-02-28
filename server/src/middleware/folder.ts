import { Folder } from 'src/interface/dbinterface';
import { refreshDatabase, getDatabase, saveDatabase } from './common';
import { deleteFileById, getFilesByFolderId } from './files';
import { APP_CONSTANTS } from 'src/constants/app.constants';

let folders: Folder[] = [];

const setFoldersData = () => {
  refreshDatabase();
  const db = getDatabase(APP_CONSTANTS.DATABASES.FOLDERSDB);

  if (db.success && db.data?.length) {
    try {
      folders = JSON.parse(db.data);
    } catch (error) {
      console.error('Error parsing database data:', error.message);
    }
  }
};

const updateFoldersData = () => {
  const updatedFoldersData = folders;
  saveDatabase(APP_CONSTANTS.DATABASES.FOLDERSDB, updatedFoldersData);
  setFoldersData();
};

const setNewFolderData = (data: Folder) => {
  folders.push(data);
  updateFoldersData();
};

const isFolderUnique = (foldername: string, currentParentFolderId: string) =>
  !folders.find(
    (folder) =>
      folder.name === foldername && folder.parent_id === currentParentFolderId,
  );

const getFolderById = (folderId: string) =>
  folders.find((folder) => folder._id === folderId);

const getFoldersByAuthorId = (owner_id: string) =>
  folders.filter((folder) => folder.owner_id === owner_id);

const getFolderList = () => {
  setFoldersData();
  return folders;
};

const deleteFolderById = (folderId: string) => {
  try {
    const folderIndex = folders.findIndex((folder) => folder._id === folderId);
    if (folderIndex !== -1) {
      const deletedFolder = folders.splice(folderIndex, 1)[0];
      getFilesByFolderId(folderId).forEach((file) => deleteFileById(file._id));
      updateFoldersData();
      return deletedFolder;
    } else {
      return { success: false, message: 'Folder not found' };
    }
  } catch (err) {
    return { success: false, err: err.message };
  }
};

const updateFolderById = (folderId: string, newData: Folder) => {
  const folderIndex = folders.findIndex((folder) => folder._id === folderId);
  if (folderIndex !== -1) {
    folders[folderIndex] = { ...folders[folderIndex], ...newData };
    updateFoldersData();
    return { success: true, message: 'Folder updated successfully' };
  } else {
    return { success: false, message: 'Folder not found' };
  }
};

const getSubfolders = (parentFolderId: string) => {
  return folders.filter((folder) => folder.parent_id === parentFolderId);
};

const getFolderPath = (folderId: string) => {
  const folderPath = [];
  let currentFolder: any = getFolderById(folderId);

  while (currentFolder) {
    folderPath.unshift(currentFolder.name);
    currentFolder = getFolderById(currentFolder.parent_id);
  }

  return folderPath;
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
};
