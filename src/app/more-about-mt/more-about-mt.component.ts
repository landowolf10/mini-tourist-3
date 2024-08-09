import { Component } from '@angular/core';
import { DownloadButtonService } from '../services/download-button.service';

@Component({
  selector: 'app-more-about-mt',
  templateUrl: './more-about-mt.component.html',
  styleUrls: ['./more-about-mt.component.css']
})
export class MoreAboutMtComponent {
  constructor(
    private downloadButtonService: DownloadButtonService
  ) {}


  ngOnInit() {
    this.downloadButtonService.setButtonVisibility(false);
  }
}
