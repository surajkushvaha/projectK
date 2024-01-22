const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:4200', credentials: true }), express.json());

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
let message = "file uploaded successfully"

// In-memory "database" for simplicity
let folders = [];
let files = [];
let users = [];

// Function to get a folder by ID
const getFolderById = (id) => folders.find(folder => folder.id === id);
// Function to check folder uniqueness
const isFolderUnique = (folderName, currentParentFolderId) => {
    const existingFolder = folders.find(folder => folder.name === folderName && folder.parentfolderId === currentParentFolderId);
    return !existingFolder;
};
const isFileUnique = (filename, currentParentFolderId) => {
    const existingFile = files.find(file => file.name === filename && file.parentfolderId === currentParentFolderId);
    return !existingFile;
};
// Function to get a file by ID
const getFileById = (fileId) => files.find(file => file.fileId === fileId);

// Load existing data from JSON file
const loadDatabase = () => {
    try {
        const databasePath = path.join(__dirname, 'database.json');
        const data = fs.readFileSync(databasePath, 'utf-8');
        const jsonData = JSON.parse(data);
        folders = jsonData.folders || [];
        files = jsonData.files || [];
        users = jsonData.users || [];
    } catch (error) {
        console.error('Error loading database:', error.message);
    }
};

// Save data to the JSON file
const saveDatabase = () => {
    try {
        const databasePath = path.join(__dirname, 'database.json');
        const jsonData = { folders, files , users };
        fs.writeFileSync(databasePath, JSON.stringify(jsonData, null, 2));
    } catch (error) {
        console.error('Error saving database:', error.message);
    }
};

// Load existing data on server start
loadDatabase();

// Endpoint for file upload
app.post('/upload', upload.array('files'), (req, res) => {
    const uploadedFiles = req.files;
    const filepaths = req.body.filepath;
    console.log('Uploading',filepaths);
    if (!uploadedFiles || uploadedFiles.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }

    for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const filepath = filepaths;
        const filename = path.basename(filepath);

        // Create folders in the in-memory database
        const foldersPath = path.dirname(filepath).split('/');
        let currentParentFolderId = null;

        foldersPath.forEach((folderName) => {
            // Check folder uniqueness
            const existingFolder = folders.find(folder => folder.name === folderName && folder.parentfolderId === currentParentFolderId);
            if (isFolderUnique(folderName, currentParentFolderId)) {

                if (!existingFolder) {
                    const folderId = uuidv4();
                    const newFolder = {
                        id: folderId,
                        name: folderName,
                        subfolders: [],
                        files: [],
                        parentfolderId: currentParentFolderId,
                        datemodified: new Date().toISOString(),
                        created: new Date().toISOString(),
                        createdBy: 'creator', // replace with actual creator information
                    };

                    folders.push(newFolder);

                    if (currentParentFolderId) {
                        const parentFolder = getFolderById(currentParentFolderId);
                        parentFolder.subfolders.push(folderId); // Add the new folder to the parent's subfolders
                    }

                    currentParentFolderId = folderId;
                } else {
                    currentParentFolderId = existingFolder.id;
                }
            } else {
                console.warn(`Folder "${folderName}" already exists in the parent folder "${currentParentFolderId?getFolderById(currentParentFolderId).name:"parent"}" and will not be created again.`);
                currentParentFolderId = existingFolder.id;
            }
        });

        // Check file uniqueness
        if (isFileUnique(filename, currentParentFolderId)) {
            // Save the file information
            const fileId = uuidv4();
            const parentFolder = getFolderById(currentParentFolderId);
            const newfilepath = path.join(__dirname, 'uploads', fileId + "." + file.originalname.split('.').pop())
            const newFile = {
                fileId,
                name: file.originalname,
                absolutePath: newfilepath,
                actualPath: filepath,
                type: file.mimetype, // replace with actual file type detection
                ext: path.extname(file.originalname).substring(1), // get extension without the dot
                parentfolderId: currentParentFolderId,
                datemodified: new Date().toISOString(),
                created: new Date().toISOString(),
            };

            files.push(newFile);
            parentFolder.files.push(fileId);
            fs.writeFileSync(newfilepath, file.buffer);
            message = "file created successfully"
        } else {
            message = `File "${filename}" already exists in the folder "${currentParentFolderId?getFolderById(currentParentFolderId).name:"parent"}" and will not be uploaded again.`
            console.warn(message);
        }
    }

    // Save folder and file information to the JSON database
    saveDatabase();

    return res.status(200).json({ message: message });
});

const userRoutes = require('./src/routes/usersDetails');
const fileRoutes = require('./src/routes/filesDetails');
const folderRoutes = require('./src/routes/folderDetails');
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/folder', folderRoutes);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
