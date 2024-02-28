import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { APP_CONSTANTS } from 'src/constants/app.constants';

const getdbPath = (dbname: string) => {
  return path.join(__dirname, '../../database', dbname);
};

const refreshDatabase = () => {
  try {
    Logger.log('Regreshing databases...');
    Object.values(APP_CONSTANTS.DATABASES).forEach((dbpath: string) => {
      const databasePath = getdbPath(dbpath);
      let data = fs.readFileSync(databasePath, 'utf-8');
      data = data ? data : JSON.stringify([]);
      fs.writeFileSync(databasePath, data);
    });
    Logger.log('Database Refreshed successfully.');
    return true;
  } catch (error) {
    Logger.error('Error refreshing database:');
    Logger.error(error.message);
    return false;
  }
};

const saveDatabase = (dbname: string, data: any) => {
  try {
    Logger.log('Saving database... :' + dbname);
    const databasePath = getdbPath(dbname);
    fs.writeFileSync(databasePath, JSON.stringify(data));
    Logger.log('Data saved to ' + dbname + ' successfully');
    return true;
  } catch (error) {
    Logger.error('Error saving database:');
    Logger.error(error.message);
    return false;
  }
};

const getDatabase = (dbname: string) => {
  try {
    Logger.log('Retriving data from database :' + dbname);
    const databasePath = getdbPath(dbname);
    const data = fs.readFileSync(databasePath, { encoding: 'utf8', flag: 'r' });
    Logger.log('Data retrived from ' + dbname + ' successfully');
    return {
      success: true,
      message: 'Data retrieved from database successfully',
      data,
    };
  } catch (error) {
    Logger.error('Error getting database:');
    Logger.error(error.message);
    return {
      success: false,
      message: `Error reading database: ${error.message}`,
    };
  }
};

export { refreshDatabase, saveDatabase, getDatabase };
