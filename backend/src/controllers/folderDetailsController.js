const { refreshDatabase, getDatabase, saveDatabase } = require('./commonController');

let foldersData = [];

const setFoldersData = () => {
    refreshDatabase();
    const db = getDatabase('folderdb');

    if (db.success && db.data?.length) {
        try {
            foldersData = JSON.parse(db.data);
        } catch (error) {
            console.error('Error parsing database data:', error.message);
        }
    }
};

const updateFoldersData = () => {
    const updatedFoldersData = JSON.stringify(foldersData);
    saveDatabase('folderdb', updatedFoldersData);
    setFoldersData();
};

const setNewFolderData = (data) => {
    foldersData.push(data);
    updateFoldersData();
};

const isFolderUnique = (foldername, currentParentFolderId) => !foldersData.find(folder => folder.name === foldername && folder.parentfolderId === currentParentFolderId);

const getFolderById = (folderId) => foldersData.find(folder => folder.folderId === folderId);

const getFoldersByAuthorId = (authorId) => foldersData.filter(folder => folder.authorId === authorId);

const getFolderList = () => {
    setFoldersData();
    return foldersData;
};

const deleteFolderById = (folderId) => {
    try {
        const folderIndex = foldersData.findIndex(folder => folder.folderId === folderId);
        if (folderIndex !== -1) {
            const deletedFolder = foldersData.splice(folderIndex, 1)[0];
            // Implement logic to delete all contents of the folder if needed
            updateFoldersData();
            return deletedFolder;
        } else {
            return { success: false, message: "Folder not found" };
        }
    } catch (err) {
        return { success: false, err: err.message };
    }
};

const updateFolderById = (folderId, newData) => {
    const folderIndex = foldersData.findIndex(folder => folder.folderId === folderId);
    if (folderIndex !== -1) {
        foldersData[folderIndex] = { ...foldersData[folderIndex], ...newData };
        updateFoldersData();
        return { success: true, message: "Folder updated successfully" };
    } else {
        return { success: false, message: "Folder not found" };
    }
};

const getSubfolders = (parentFolderId) => {
    return foldersData.filter(folder => folder.parentfolderId === parentFolderId);
};

const getFolderPath = (folderId) => {
    const folderPath = [];
    let currentFolder = getFolderById(folderId);

    while (currentFolder) {
        folderPath.unshift(currentFolder.name);
        currentFolder = getFolderById(currentFolder.parentfolderId);
    }

    return folderPath;
};

module.exports = {
    getFoldersByAuthorId,
    getFolderById,
    getFolderList,
    isFolderUnique,
    setNewFolderData,
    deleteFolderById,
    updateFolderById,
    getSubfolders,
    getFolderPath
};
