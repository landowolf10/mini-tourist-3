import { Component } from '@angular/core';
import { DownloadButtonService } from '../services/download-button.service';

@Component({
  selector: 'app-where-is-mt',
  templateUrl: './where-is-mt.component.html',
  styleUrls: ['./where-is-mt.component.css']
})
export class WhereIsMtComponent {
  constructor(
    private downloadButtonService: DownloadButtonService
  ) {}


  ngOnInit() {
    this.downloadButtonService.setButtonVisibility(false);
  }
}
