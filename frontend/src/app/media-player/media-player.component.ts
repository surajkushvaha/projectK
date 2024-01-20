import { Component, Input } from '@angular/core';
import { FileDetails } from '../declaredValues/webviewer.constants';
@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.scss'
})
export class MediaPlayerComponent {
  isVideo: boolean = false;
  @Input() fileDetails: FileDetails;
}
