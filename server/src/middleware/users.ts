import * as fs from 'fs';
import * as path from 'path';
import { refreshDatabase, getDatabase, saveDatabase } from './common';
import { APIResponse, User } from 'src/interface/dbinterface';
import { APP_CONSTANTS } from 'src/constants/app.constants';
import { logger } from './logger';
import { validateUser } from './validators';

let users: User[] = [];

const setUsersData = (): void => {
  refreshDatabase();
  const db = getDatabase(APP_CONSTANTS.DATABASES.USERSDB);
  if (db.success && db.data?.length) {
    try {
      if (typeof db.data == 'string') {
        users = JSON.parse(db.data);
      } else {
        users = db.data;
      }
      logger.info('All users retrieved from database.');
    } catch (error: any) {
      logger.error('Error parsing database data:');
      logger.error(error.message);
    }
  }
};

const updateUsersData = (): void => {
  saveDatabase(APP_CONSTANTS.DATABASES.USERSDB, users);
  setUsersData();
};

const isUserUnique = (username: string): boolean => {
  setUsersData();
  return !users.find((user) => user.username === username);
};

const isEmailUnique = (email: string): boolean => {
  setUsersData();
  return !users.find((user) => user.email === email);
};

const getUserById = (userId: string): User | undefined => {
  setUsersData();
  return users.find((user) => user._id === userId);
};

const addUser = (user: User): APIResponse => {
  const validationResponse = validateUser(user);
  if (!validationResponse.success) {
    return validationResponse;
  }
  setUsersData();
  if (users.find((u) => u.username === user.username)) {
    return { success: false, message: 'Username already exists' };
  }
  if (users.find((u) => u.email === user.email)) {
    return { success: false, message: 'Email already exists' };
  }

  const userDir = path.resolve(__dirname, '../../uploads/', user._id);
  fs.mkdirSync(userDir, { recursive: true });

  users.push(user);
  updateUsersData();

  return { success: true, message: 'User signup successful', data: user };
};

const getUserList = (): User[] => {
  setUsersData();
  return users;
};

const updateUserById = (userId: string, newData: User): APIResponse => {
  const validationResponse = validateUser(newData);
  if (!validationResponse.success) {
    return validationResponse;
  }
  setUsersData();
  const userIndex = users.findIndex((user) => user._id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...newData };
    updateUsersData();
    logger.success('User updated successfully');
    return { success: true, message: 'User updated successfully' };
  } else {
    logger.alert('User not found.');
    return { success: false, message: 'User not found' };
  }
};

const deleteUserById = (userId: string): APIResponse => {
  setUsersData();
  const userIndex = users.findIndex((user) => user._id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0];
    updateUsersData();
    logger.success('User deleted successfully');
    return {
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    };
  } else {
    logger.alert('User not found.');
    return { success: false, message: 'User not found' };
  }
};

const changePassword = (userId: string, newPassword: string): APIResponse => {
  setUsersData();
  const userIndex = users.findIndex((user) => user._id === userId);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    updateUsersData();
    return { success: true, message: 'Password changed successfully' };
  } else {
    return { success: false, message: 'User not found' };
  }
};

const getUserByEmailAndPassword = (
  email: string,
  password: string,
): APIResponse => {
  setUsersData();
  const loginUser = users.find(
    (user) => user.email === email && user.password === password,
  );
  if (loginUser) {
    return { success: true, message: 'Login successful', data: loginUser };
  } else {
    return { success: false, message: 'Invalid email or password' };
  }
};

export {
  addUser,
  isUserUnique,
  isEmailUnique,
  getUserById,
  getUserList,
  updateUserById,
  deleteUserById,
  changePassword,
  getUserByEmailAndPassword,
};
