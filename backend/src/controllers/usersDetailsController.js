const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { refreshDatabase, getDatabase, saveDatabase } = require('./commonController');

let userDetails = [];

const setUsersDetails = () => {
    refreshDatabase();
    let db = getDatabase('userdb');
    if (db.success && db.data?.length) userDetails = JSON.parse(db.data);
};

const updateUsersDetails = () => {
    let updatedUserDetails = JSON.stringify(userDetails);
    saveDatabase('userdb', updatedUserDetails);
    setUsersDetails();
};

const setNewUsersDetails = (data) => {
    userDetails.push(data);
    updateUsersDetails();
};

const isUserUnique = (username) => !userDetails.find(user => user.username === username);

const getUserById = (userId) => userDetails.find(user => user.userId === userId);

const isEmailExist = (email) => userDetails.filter(user => email === user.email);

const addUser = (user) => {
    if (isUserUnique(user.username)) {
        if (isEmailExist(user.email).length === 0) {
            user.id = uuidv4();
            let newpath = path.resolve(__dirname, '../../uploads/');
            user.path = path.join(newpath, user.id);

            fs.mkdir(user.path, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("New Directory created successfully!!");
                }
            });

            setNewUsersDetails(user);
            return user;
        } else {
            throw new Error('Email already exists');
        }
    } else {
        throw new Error('Username already exists');
    }
};

const getUserList = () => {
    setUsersDetails();
    return userDetails;
};

// Additional functions
const updateUser = (userId, newData) => {
    const userIndex = userDetails.findIndex(user => user.userId === userId);
    if (userIndex !== -1) {
        userDetails[userIndex] = { ...userDetails[userIndex], ...newData };
        updateUsersDetails();
        return { success: true, message: "User updated successfully" };
    } else {
        return { success: false, message: "User not found" };
    }
};

const deleteUser = (userId) => {
    const userIndex = userDetails.findIndex(user => user.userId === userId);
    if (userIndex !== -1) {
        const deletedUser = userDetails.splice(userIndex, 1)[0];
        // Implement logic to delete all user-related data (files, folders, etc.) if needed
        updateUsersDetails();
        return deletedUser;
    } else {
        return { success: false, message: "User not found" };
    }
};

const changePassword = (userId, newPassword) => {
    const userIndex = userDetails.findIndex(user => user.userId === userId);
    if (userIndex !== -1) {
        userDetails[userIndex].password = newPassword;
        updateUsersDetails();
        return { success: true, message: "Password changed successfully" };
    } else {
        return { success: false, message: "User not found" };
    }
};

const getUserFiles = (userId) => {
    // Implement logic to retrieve all files owned by the user
    return []; // Placeholder for actual implementation
};

const getUserFolders = (userId) => {
    // Implement logic to retrieve all folders owned by the user
    return []; // Placeholder for actual implementation
};

const shareFileOrFolder = (userId, targetUserId, fileId, folderId) => {
    // Implement logic to share a file or folder with another user
    return { success: true, message: "File/Folder shared successfully" }; // Placeholder for actual implementation
};

module.exports = {
    addUser,
    isEmailExist,
    isUserUnique,
    getUserById,
    getUserList,
    updateUser,
    deleteUser,
    changePassword,
    getUserFiles,
    getUserFolders,
    shareFileOrFolder
};
