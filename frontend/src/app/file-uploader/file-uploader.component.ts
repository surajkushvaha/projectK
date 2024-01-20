import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { File } from 'buffer';
import JSZip from 'jszip';
import { FileDetail, FolderList } from '../interfaces/skeleton.interface';


@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent {
  @ViewChild('listing') listing: ElementRef;
  filelist: FileDetail[] = [];
  allFiles: FileDetail[] = []
  folderlist: FolderList[] = [];
  constructor(private httpClient: HttpClient) { }


  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    let items = event.dataTransfer.items;
    console.log(event, event.dataTransfer, event.dataTransfer.files, event.dataTransfer.items)
    this.processUpload(items)
  }

  processUpload(items) {
    this.filelist = [];
    this.folderlist = [];
    this.allFiles = [];
    this.listing.nativeElement.textContent = "";

    for (let i = 0; i < items.length; i++) {
      let item = items[i].webkitGetAsEntry();

      if (item) {
        this.scanFiles(item, this.filelist, this.folderlist).then((folders) => {
          if (i == 0) {
            this.processingFileandFolder(folders, this.allFiles)
          }
        })
      }
    }
  }
  processingFileandFolder(folders, files) {
    console.log("folders : ", folders);
    console.log("all files : ", files);
  }
  onChange(event: any): void {
    console.log(event)
    const files = event.target?.files;
    console.log(files)

    for (const file of files) {
      const formData = new FormData();
      formData.append('filepath', file.webkitRelativePath || file.name)
      formData.append('files', file);
      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Upload successful:', data);
        })
        .catch(error => {
          console.error('Error uploading files:', error);
        });
    }

    event.target.value = ''

  }

  async scanFiles(item, filelisting: FileDetail[], folderlisting: FolderList[]) {
    if (item.isDirectory) {
      let folder: FolderList = {
        path: item.fullPath,
        name: item.name,
        subfolders: [],
        files: [],
      };

      folderlisting.push(folder);

      let directoryReader = item.createReader();
      await new Promise<void>((resolve) => {
        directoryReader.readEntries(async (entries) => {
          for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            await this.scanFiles(
              entry,
              folder.files,
              folder.subfolders
            );
          }
          resolve();
        });
      });

      // folderlisting.subfolders?.push(folder);
    } else if (item.isFile) {
      let file: File = await this.getFile(item) as File;
      this.allFiles.push({
        filePath: item.fullPath,
        file: file as File,
      });
      filelisting.push({
        filePath: item.fullPath,
        file: file as File,
      });
    }

    return folderlisting;
  }

  async getFile(fileEntry) {
    return new Promise((resolve, reject) => fileEntry.file(resolve, reject));
  }
}

