import { Component, Input } from '@angular/core';
import { DownloadButtonService } from '../services/download-button.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = this.formBuilder.group({
		full_name: new FormControl('', []),
		email: new FormControl('', [Validators.email]),
		phone_number: new FormControl('',  []),
		message: new FormControl('', [Validators.required])
	});
  socialMedia: string[] = ['facebook.png', 'whats.png', 'instagram.png', 'twitter.png'];

  constructor(
    private downloadButtonService: DownloadButtonService,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit() {
    this.downloadButtonService.setButtonVisibility(false);
    this.initializeCarousel();
  }

  private initializeCarousel() {
    setTimeout(() => {
      // Initialize the carousel here using jQuery
      $('.carousel').carousel({
        padding: 200
      });
      //this.autoplay();
    }, 0);
  }

  private autoplay() {
    $('.carousel').carousel('next');
    setTimeout(() => this.autoplay(), 4500);
  }
}
