import {  Component, ElementRef, Input, ViewChild } from '@angular/core';
import WebViewer, { WebViewerInstance, WebViewerOptions,Core, UI } from "@pdftron/webviewer";
import { FileDetails, webViewerDetails } from '../declaredValues/webviewer.constants';


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss'
})
export class ViewerComponent {
  @Input() sourceUrl:string;  
  @ViewChild('viewer') viewer!: ElementRef;
  @Input()  fileDetails: FileDetails;
  
  private wvInstance!: WebViewerInstance;
  private webViewerOption: WebViewerOptions;
  private loadDocumentOption: Core.LoadDocumentOptions;

  ngAfterViewInit(): void {   
    this.webViewerOption = webViewerDetails.webViewerOptions;
    this.loadDocumentOption = webViewerDetails.loadDocumentOption;
    this.loadDocumentOption.filename = this.fileDetails.filename;
    this.loadDocument();
  }

  loadDocument(){
    WebViewer.WebComponent(this.webViewerOption, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;
      (window as any).instance = instance;
      const { documentViewer } = instance.Core;
      console.log(this.fileDetails)
      documentViewer.loadDocument(this.fileDetails.file,this.loadDocumentOption)
    })
  }
  
  ngOnDistroy(): void {
    this.wvInstance?.UI.dispose();
  }
}
