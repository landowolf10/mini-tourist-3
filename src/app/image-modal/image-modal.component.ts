import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectedImageService } from '../services/selected-image.service';
import { DownloadButtonService } from '../services/download-button.service';
import { StatusService } from '../services/card-status.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent {
  selectedImageName: string = '';
  isDownloadButtonVisible: boolean = false;
  isFlipped: boolean = false;
  clientId: number | null = null;
  city: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private selectedImageService: SelectedImageService,
    private downloadButtonService: DownloadButtonService,
    private statusService: StatusService
  ) { 
    console.log('Modal received data: ', data);

    this.selectedImageService.selectedImageName$.subscribe((imageName) => {
      this.selectedImageName = imageName;
      this.isDownloadButtonVisible = !!imageName;
    });

    this.downloadButtonService.isButtonVisible$.subscribe((isVisible) => {
      this.isDownloadButtonVisible = isVisible;
    });

    if (data && data.card) {
      this.clientId = data.card.clientId;
      this.city = data.card.city;
    } else {
      console.error('No card data provided to modal');
    }
  }
  
  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  downloadImage(): void {
    if (!this.selectedImageName) {
      console.error("No image URL provided");
      return;
    }
  
    console.log("Downloading image from URL: ", this.selectedImageName);
  
    fetch(this.selectedImageName)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
  
        // Extract filename and provide a default name if undefined
        const filename = this.selectedImageName.split('/').pop() || 'downloaded-image';
        a.download = filename;
  
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
  
        // Clean up
        window.URL.revokeObjectURL(url);

        // Register status after successful download
        if (this.clientId && this.city) {
          const status = 'Downloaded';
          const date = new Date().toISOString();
          this.statusService.registerStatus(this.clientId, status, this.city, date).subscribe(
            data => console.log('Status registered: ', data),
            error => console.error('Error registering status: ', error)
          );
        } else {
          console.error('Client ID or city is missing');
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }  

  onCloseModal(): void {
    this.dialogRef.close();
  }
}