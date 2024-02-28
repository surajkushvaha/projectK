import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { refreshDatabase, getDatabase, saveDatabase } from './common';
import { User } from 'src/interface/dbinterface';
import { APP_CONSTANTS } from 'src/constants/app.constants';

let users: User[] = [];

const setUsersDetails = () => {
  refreshDatabase();
  const db = getDatabase(APP_CONSTANTS.DATABASES.USERDB);
  if (db.success && db.data?.length) users = JSON.parse(db.data);
};

const updateUsersDetails = () => {
  const updatedUserDetails = users;
  saveDatabase(APP_CONSTANTS.DATABASES.USERDB, updatedUserDetails);
  setUsersDetails();
};

const setNewUsersDetails = (data: User) => {
  users.push(data);
  updateUsersDetails();
};

const isUserUnique = (username: string) =>
  !users.find((user) => user.username === username);

const getUserById = (userId: string) =>
  users.find((user) => user._id === userId);

const isEmailExist = (email: string) =>
  users.filter((user) => email === user.email);

const addUser = (user: User) => {
  setUsersDetails();
  if (isUserUnique(user.username)) {
    if (isEmailExist(user.email).length === 0) {
      user._id = uuidv4();
      const newpath = path.resolve(__dirname, '../../uploads/');
      const afterpath = path.join(newpath, user._id);
      fs.mkdirSync(afterpath, { recursive: true });

      setNewUsersDetails(user);
      return {
        success: true,
        message: 'User signup successful',
        data: user,
      };
    } else {
      return {
        success: false,
        message: 'Email already exists',
      };
    }
  } else {
    return {
      success: false,
      message: 'Username already exists',
    };
  }
};

const getUserList = () => {
  setUsersDetails();
  return users;
};

// Additional functions
const updateUser = (userId: string, newData: User) => {
  const userIndex = users.findIndex((user) => user._id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...newData };
    updateUsersDetails();
    return { success: true, message: 'User updated successfully' };
  } else {
    return { success: false, message: 'User not found' };
  }
};

const deleteUser = (userId: string) => {
  const userIndex = users.findIndex((user) => user._id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0];
    // Implement logic to delete all user-related data (files, folders, etc.) if needed
    updateUsersDetails();
    return deletedUser;
  } else {
    return { success: false, message: 'User not found' };
  }
};

const changePassword = (userId: string, newPassword: string) => {
  const userIndex = users.findIndex((user) => user._id === userId);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    updateUsersDetails();
    return { success: true, message: 'Password changed successfully' };
  } else {
    return { success: false, message: 'User not found' };
  }
};

export {
  addUser,
  isEmailExist,
  isUserUnique,
  getUserById,
  getUserList,
  updateUser,
  deleteUser,
  changePassword,
};
