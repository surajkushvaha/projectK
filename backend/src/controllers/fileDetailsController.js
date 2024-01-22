const { refreshDatabase, getDatabase, saveDatabase } = require('./commonController');
const fs = require('fs');

let filesData = [];

const setFilesData = () => {
    refreshDatabase();
    const db = getDatabase('filedb');

    if (db.success && db.data?.length) {
        try {
            filesData = JSON.parse(db.data);
        } catch (error) {
            console.error('Error parsing database data:', error.message);
        }
    }
};

const updateFilesData = () => {
    const updatedFilesData = JSON.stringify(filesData);
    saveDatabase('filedb', updatedFilesData);
    setFilesData();
};

const setNewFilesData = (data) => {
    filesData.push(data);
    updateFilesData();
};

const isFileUnique = (filename, currentParentFolderId) => !filesData.find(file => file.name === filename && file.parentfolderId === currentParentFolderId);

const getFileById = (fileId) => filesData.find(file => file.fileId === fileId);

const getFilesByAuthorId = (authorId) => filesData.filter(file => file.authorId === authorId);

const getFilesByAuthorIdAndFolderId = (authorId, folderId) => filesData.filter(file => file.authorId === authorId && file.parentfolderId === folderId);

const getTotalFileSizeByAuthorId = (authorId) => {
    const files = getFilesByAuthorId(authorId);
    const totalFileSize = files.reduce((accumulator, file) => accumulator + file.filesize, 0);
    return totalFileSize;
};

const getTotalFileSizeByAuthorIdAndFolderId = (authorId, folderId) => {
    const files = getFilesByAuthorIdAndFolderId(authorId, folderId);
    const totalFileSize = files.reduce((accumulator, file) => accumulator + file.filesize, 0);
    return totalFileSize;
};

const getFileList = () => {
    setFilesData();
    return filesData;
};

const deleteFileById = (fileId) => {
    try {
        const file = getFileById(fileId);
        const fileIndex = filesData.findIndex(file => file.fileId === fileId);
        if (fileIndex !== -1) {
            filesData.splice(fileIndex, 1);
            updateFilesData();
        } else {
            return { success: false, message: "File not found" };
        }
        fs.unlinkSync(file.absolutePath);
        return { success: true, message: "File deleted successfully" };
    } catch (err) {
        return { success: false, err: err.message };
    }
}

const updateFileById = (fileId, newData) => {
    const fileIndex = filesData.findIndex(file => file.fileId === fileId);
    if (fileIndex !== -1) {
        filesData[fileIndex] = { ...filesData[fileIndex], ...newData };
        updateFilesData();
        return { success: true, message: "File updated successfully" };
    } else {
        return { success: false, message: "File not found" };
    }
};

const moveFileToAnotherFolder = (fileId, newFolderId) => {
    const fileIndex = filesData.findIndex(file => file.fileId === fileId);
    if (fileIndex !== -1) {
        filesData[fileIndex].parentfolderId = newFolderId;
        updateFilesData();
        return filesData[fileIndex];
    }
    return null; // File not found
};

module.exports = {
    getFileList,
    getTotalFileSizeByAuthorIdAndFolderId,
    getTotalFileSizeByAuthorId,
    getFilesByAuthorIdAndFolderId,
    getFilesByAuthorId,
    getFileById,
    isFileUnique,
    setNewFilesData,
    deleteFileById,
    updateFileById,
    moveFileToAnotherFolder
};
