import { Component } from '@angular/core';
import { DownloadButtonService } from '../services/download-button.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private downloadButtonService: DownloadButtonService,
  ) {}

  ngOnInit() {
    this.downloadButtonService.setButtonVisibility(false);
  }

  email: string = '';
  password: string = '';

  login(email: string, password: string) {
    console.log('Email: ', email, ', password: ', password)
  }
}
