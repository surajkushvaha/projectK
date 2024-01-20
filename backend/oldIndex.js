// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const AdmZip = require('adm-zip');
// const path = require('path');
// const fs = require('fs/promises');
// const fss = require('fs');

// const app = express();
// const port = 3000;

// const storage = multer.memoryStorage(); // Use memory storage for handling zip file
// const upload = multer({ storage: storage });

// app.use(cors({ origin: 'http://localhost:4200', credentials: true }));

// app.post('/api/upload', upload.single('file'), async (req, res) => {
//   console.log(req.file)
//   const zipBuffer = req.file.buffer;
//   const zip = new AdmZip(zipBuffer);

//   // Define the base directory where files will be extracted
//   const baseDirectory = path.join('uploads','');

//   // Check if the directory exists, and create it if not
//   if (!fss.existsSync(baseDirectory)) {
//     await fs.mkdir(baseDirectory, { recursive: true });
//   }

//   try {
//     // Extract the contents of the zip file
//     zip.extractAllTo(baseDirectory, /*overwrite*/ true);

//     // Process folder structure and copy files
//     const files = await processFolderStructure(baseDirectory);

//     res.send({message:`Files uploaded and extracted successfully! ${files.length} files processed.`});
//   } catch (error) {
//     console.error('Error during file operations:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// async function processFolderStructure(basePath) {
//   const files = [];

//   async function traverse(currentPath) {
//     const entries = await fs.readdir(currentPath, { withFileTypes: true });

//     for (const entry of entries) {
//       const entryPath = path.join(currentPath, entry.name);
//       if (entry.isDirectory()) {
//         await traverse(entryPath);
//       } else {
//         files.push(entryPath);
//       }
//     }
//   }

//   await traverse(basePath);
//   return files;
// }

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
