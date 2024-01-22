const fs = require('fs');
const path = require('path');

const filedb = path.join(__dirname, '../../database/fileDetailsDB.json');
const folderdb = path.join(__dirname, '../../database/folderDetailsDB.json');
const usersdb = path.join(__dirname, '../../database/usersDetailsDB.json');

const refreshDatabase = () => {
    try {
        let databases = [filedb, folderdb, usersdb];
        databases.forEach((dbpath) => {
            const databasePath = dbpath;
            let data = fs.readFileSync(databasePath, 'utf-8');
            data = data ? data : JSON.stringify([]);
            fs.writeFileSync(databasePath, data);
        });
        return { success: true, message: 'Database refreshed successfully' };
    } catch (error) {
        console.error('Error refreshing database:', error.message);
        return { success: false, message: `Error refreshing database: ${error.message}` };
    }
};

const saveDatabase = (dbname, data) => {
    try {
        const databasePath = whichDatabase(dbname);
        fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
        return { success: true, message: 'Data saved to database successfully' };
    } catch (error) {
        console.error('Error saving database:', error.message);
        return { success: false, message: `Error saving database: ${error.message}` };
    }
};

const getDatabase = (dbname) => {
    try {
        const databasePath = whichDatabase(dbname);
        const data = fs.readFileSync(databasePath, { encoding: 'utf8', flag: 'r' });
        return { success: true, message: 'Data retrieved from database successfully', data };
    } catch (error) {
        console.error('Error reading database:', error.message);
        return { success: false, message: `Error reading database: ${error.message}` };
    }
};

const whichDatabase = (dbname) => {
    switch (dbname) {
        case 'filedb':
            return filedb;
        case 'folderdb':
            return folderdb;
        case 'usersdb':
            return usersdb;
        default:
            throw new Error(`Unsupported database: ${dbname}`);
    }
};

module.exports = { refreshDatabase, saveDatabase, getDatabase };
