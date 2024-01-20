import {UI, Core, WebViewerOptions } from "@pdftron/webviewer";

const webViewerServerUrl: string = 'http://localhost:8090/';
const webViewerLicenseKey: string = "Asite Solutions Limited (asite.com):OEM:Adoddle::B+:AMS(20240328):1D55AECC04C751554FF9AA24D77C00C5E6613FDDFF58BD3B95A545DA2A2CC9A07AD4B6F5C7";

export interface FileDetails{
    url:string,
    ext: string,
    filename?:string,
    file?:File
}

export interface webViewerDetails {
    webViewerLicenseKey: string;
    webViewerOptions: WebViewerOptions;
    loadDocumentOption: Core.LoadDocumentOptions
}

export const webViewerDetails: webViewerDetails = {
    webViewerLicenseKey: '',
    webViewerOptions: {
        path: '../lib',
        licenseKey: webViewerLicenseKey,
        accessibleMode: true,
        annotationUser: 'suraj',
        autoExpandOutlines: true,
        enableOfficeEditing: true,
        webviewerServerURL: webViewerServerUrl,
        forceClientSideInit: true,
        disabledElements: [''],
        useDownloader: true,
        autoFocusNoteOnAnnotationSelection: true,
        backendType: "asm",
        disableMultiViewerComparison: true,
        fullAPI:true,
    },
    loadDocumentOption: {
        webviewerServerURL: webViewerServerUrl,
        backendType: "asm",
        forceClientSideInit: true,
        // onError: (err) => {
        //     UI.displayErrorMessage(err.message);
        // },
        // onLoadingProgress: (progress) => {
        //     UI.showWarningMessage(progress.toString());
        // },
        xodOptions: {
            streaming: true,
        }
    }
}
export const supportedMediaFormats ={
    audioExtensions : [
        'mp3',   // MPEG Audio Layer III
        'wav',   // Waveform Audio File Format
        'ogg',   // Ogg Vorbis
        'm4a',   // MPEG-4 Audio
        'aac',   // Advanced Audio Coding
        'wma',   // Windows Media Audio
        'flac',  // Free Lossless Audio Codec
        'opus'   // Opus Audio Codec
    ],
    videoExtensions : [
        'webm',  // WebM Video
        'mp4',   // MPEG-4 Video
        'ogg',   // Ogg Theora
        'mov',   // QuickTime Movie
        'avi',   // Audio Video Interleave
        'wmv',   // Windows Media Video
        'flv',   // Flash Video
        'mkv'    // Matroska Multimedia Container
    ]
}
export const  supportedDocumentFormat = {
    
}