import { Component, Input } from '@angular/core';
import { DownloadButtonService } from '../services/download-button.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent {
  contactForm = this.formBuilder.group({
		full_name: new FormControl('', []),
		email: new FormControl('', [Validators.email]),
		phone_number: new FormControl('',  []),
		message: new FormControl('', [Validators.required])
	});
  @Input() rating: number = 0;
  ratings: { [key: string]: number } = { rating1: 0, rating2: 0, rating3: 0 };

  constructor(
    private downloadButtonService: DownloadButtonService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.downloadButtonService.setButtonVisibility(false);
  }

  rate(newRating: number, key: string) {
    this.ratings[key] = newRating;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
			const value = this.contactForm.value;
			const form = new FormData();
      
			form.append('full_name', value.full_name || ''); // Provide a default value if it's null or undefined
      form.append('email', value.email || ''); // Provide a default value if it's null or undefined
      form.append('phone_number', value.phone_number || ''); // Provide a default value if it's null or undefined
      form.append('message', value.message || '');

      console.log('Rating 1:', this.ratings['rating1']);
      console.log('Rating 2:', this.ratings['rating2']);
      console.log('Rating 3:', this.ratings['rating3']);

      // Submit your form to app call
      alert(`Name: ${value.full_name}, Email: ${value.email}, Message: ${value.message} `);
		}
  }
}
