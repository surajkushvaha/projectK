const fs = require('fs');
const path = require('path');

const filedb = path.resolve(__dirname, '../../database/fileDetailsDB.json');
const folderdb = path.resolve(__dirname, '../../database/folderDetailsDB.json');
const usersdb = path.resolve(__dirname, '../../database/usersDetailsDB.json');

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
        console.error('Error loading database:', error.message);
        return { success: false, message: `Error loading database: ${error.message}` };
    }
};

const saveDatabase = (dbname, data) => {
    try {
        const databasePath = whichDatabase(dbname);;
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
        return { success: true, message: 'Data saved to database successfully' , data:fs.readFileSync(databasePath, { encoding: 'utf8', flag: 'r' })};
    } catch (error) {
        console.error('Error saving database:', error.message);
        return { success: false, message: `Error saving database: ${error.message}` };
    }
};

const whichDatabase = (dbname)=>{
    switch (dbname) {
        case 'filedb':
            return filedb;  
        case 'folderdb':
            return folderdb;
        case 'usersdb':
            return usersdb;
    } 
}
module.exports = [refreshDatabase, saveDatabase, getDatabase];
