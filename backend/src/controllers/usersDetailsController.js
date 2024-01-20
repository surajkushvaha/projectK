
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.resolve(__dirname, '../../database.json');

function getUsers() {
    const rawData = fs.readFcileSync(dbPath, 'utf-8');
    return rawData ? JSON.parse(rawData).users: [];
}

function getFullDB() {
    const rawData = fs.readFileSync(dbPath, 'utf-8');
    return rawData ? JSON.parse(rawData): {};
}
function addUser(user) {
    let isexist = isUsernameExist(user.username);
    console.log(isexist )
    if(isexist.length>0){
        return new Error('Username already exists'); 
    }else{
        user['id'] = uuidv4();
        let newpath= path.resolve(__dirname, '../../uploads/');
        user['path'] = newpath + user.id;
        fs.mkdir(newpath+ '/' + user.id, (error) => { 
            if (error) { 
            console.log(error); 
            } else { 
            console.log("New Directory created successfully !!"); 
        } });
        let getDB =  getFullDB();
        getDB.users.push(user);

        fs.writeFileSync(dbPath, JSON.stringify(getDB, null, 2));
        return user;
    }
}
function isUsernameExist(username) {
   return getUsers().filter(user => username === user.username)
}
function isEmailExist(email) {
    return getUsers().filter(user => email === user.email)
}
module.exports = {
    getUsers,
    addUser,
    isUsernameExist,
    isEmailExist
};
