import * as fs from 'fs';
import * as path from 'path';
import { APP_CONSTANTS } from 'src/constants/app.constants';
import { logger } from './logger';

const getdbPath = (dbname: string) => {
  return path.join(__dirname, '../../database', dbname);
};

const refreshDatabase = () => {
  try {
    logger.notify('Refreshing databases...');
    Object.values(APP_CONSTANTS.DATABASES).forEach((dbpath: string) => {
      const databasePath = getdbPath(dbpath);
      if (!fs.existsSync(databasePath)) {
        fs.writeFileSync(databasePath, JSON.stringify([]));
      }
      let data = fs.readFileSync(databasePath, 'utf-8');
      data = data ? data : JSON.stringify([]);
      fs.writeFileSync(databasePath, data);
    });
    logger.notify('Database refreshed successfully.');
    return true;
  } catch (error: any) {
    logger.error('Error refreshing database:');
    logger.error(error.message);
    return false;
  }
};

const saveDatabase = (dbname: string, data: any) => {
  try {
    logger.notify('Saving database: ' + dbname);
    const databasePath = getdbPath(dbname);
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2)); // Indent JSON for readability
    logger.notify('Data saved to ' + dbname + ' successfully');
    return true;
  } catch (error: any) {
    logger.error('Error saving database: ' + dbname);
    logger.error(error.message);
    return false;
  }
};

const getDatabase = (dbname: string) => {
  try {
    logger.notify('Retrieving data from database: ' + dbname);
    const databasePath = getdbPath(dbname);
    if (!fs.existsSync(databasePath)) {
      logger.alert(
        `Database file not found: ${dbname}. Initializing new database.`,
      );
      fs.writeFileSync(databasePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(databasePath, { encoding: 'utf8', flag: 'r' });
    try {
      const parsedData = JSON.parse(data);
      logger.success('Data retrieved from ' + dbname + ' successfully');
      return {
        success: true,
        message: 'Data retrieved from database successfully',
        data: parsedData,
      };
    } catch (parseError: any) {
      logger.error('Error parsing data from database: ' + dbname);
      logger.error(parseError.message);
      return {
        success: false,
        message: `Error parsing data from database: ${parseError.message}`,
      };
    }
  } catch (error: any) {
    logger.error('Error reading database: ' + dbname);
    logger.error(error.message);
    return {
      success: false,
      message: `Error reading database: ${error.message}`,
    };
  }
};

export { refreshDatabase, saveDatabase, getDatabase };
