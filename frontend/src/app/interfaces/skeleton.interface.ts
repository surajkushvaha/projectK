import { File } from "buffer";

export interface FileDetail {
    file: File;
    filePath: string;
}
export interface FolderList {
    files?: FileDetail[];
    name: string;
    path: string;
    subfolders?: FolderList[];
}
