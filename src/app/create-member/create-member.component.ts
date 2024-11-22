import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent {
  createMemberForm: FormGroup;
  frontImagePreview: string | ArrayBuffer | null = null;
  backImagePreview: string | ArrayBuffer | null = null;
  cities: string[] = ['Zihuatanejo', 'Acapulco', 'Morelia', 'Ciudad de México'];
  categories: string[] = ['Parques y atracciones', 'Restaurantes, bares y cafeterías', 'Lugares y eventos', 'Tiendas', 'Servicios'];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createMemberForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cardName: ['', Validators.required],
      city: ['', Validators.required],
      category: ['', Validators.required],
      premium: [null, Validators.required],
      imageFile: [null],
      backImageFile: [null]
    });
    
  }

  onImageChange(event: Event, imageType: 'front' | 'back'): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      if (imageType === 'front') {
        this.createMemberForm.patchValue({ imageFile: file });
        this.createMemberForm.get('imageFile')!.updateValueAndValidity();
      } else {
        this.createMemberForm.patchValue({ backImageFile: file });
        this.createMemberForm.get('backImageFile')!.updateValueAndValidity();
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (imageType === 'front') {
          this.frontImagePreview = reader.result;
        } else {
          this.backImagePreview = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.createMemberForm.valid) {
      const memberData = new FormData();
      memberData.append('email', this.createMemberForm.get('email')?.value);
      memberData.append('password', this.createMemberForm.get('password')?.value);
      memberData.append('cardName', this.createMemberForm.get('cardName')?.value);
      memberData.append('city', this.createMemberForm.get('city')?.value);
      memberData.append('category', this.createMemberForm.get('category')?.value);
      memberData.append('premium', this.createMemberForm.get('premium')?.value);
      memberData.append('imageFile', this.createMemberForm.get('imageFile')?.value);
      memberData.append('backImageFile', this.createMemberForm.get('backImageFile')?.value);

      // Log form values and additional static data
      console.log("Form Values:", this.createMemberForm.value);

      // Make the HTTP request to submit the form data
      this.http.post('http://127.0.0.1:8000/api/v1/card/register', memberData).subscribe({
        next: (response) => {
          console.log("Member created successfully:", response);
        },
        error: (error) => {
          console.error("Error creating member:", error);
        }
      });
    } else {
      console.log("Form is invalid!");
    }
  }
}
