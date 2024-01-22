const express = require('express');
const router = express.Router();
const multer = require('multer');

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Endpoint for file upload
router.post('/upload', upload.array('files'), (req, res) => {
    const uploadedFiles = req.files;
    const filepaths = req.body.filepath;

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

module.exports = router;
