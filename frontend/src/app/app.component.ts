import { Component } from '@angular/core';
import { FileDetails, supportedMediaFormats } from './declaredValues/webviewer.constants';
@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  fileDetails: FileDetails;
  isMedia: boolean = false;
  isDocument: boolean = false;
  loadFile(fileDetails: FileDetails){
    let media = ['mp3', 'wav', 'flac', 'ogg','mp4', 'webm'];
    if ([...supportedMediaFormats.audioExtensions,...supportedMediaFormats.videoExtensions].includes(fileDetails.ext))  {
      this.isMedia=true;
      this.isDocument=false;
    } else  {
      this.isMedia=false;
      this.isDocument = true;
    }
  }
  uploadFile(e: any) {
    e.preventDefault();
    if(this.isMedia || this.isDocument) {
      this.isDocument =false;
      this.isMedia = false;
    }
    let files = e.target.files; // FileList object
    let f = files[0];
    let ext = f.name.split('.')?.pop();
    let reader = new FileReader();

    reader.onload = (e: any) => {
      const blob = new Blob([new Uint8Array(e.target.result)], { type: f.type });
      this.fileDetails = {
        url : URL.createObjectURL(blob),
        ext : ext,
        file: f,
        filename:f.name,
      }
      this.loadFile(this.fileDetails);
    };
    reader.readAsArrayBuffer(f);
  }
}