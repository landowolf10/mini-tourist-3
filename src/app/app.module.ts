import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { AboutMtCardsComponent } from './about-mt-cards/about-mt-cards.component';
import { ContactComponent } from './contact/contact.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SelectedImageService } from './services/selected-image.service';
import { RateComponent } from './rate/rate.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { WhereIsMtComponent } from './where-is-mt/where-is-mt.component';
import { MoreAboutMtComponent } from './more-about-mt/more-about-mt.component';
import { HomeComponent } from './home/home.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { FooterComponent } from './footer/footer.component';
import { TriviaComponent } from './trivia/trivia.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AboutMtCardsComponent,
    ContactComponent,
    CarouselComponent,
    ImageModalComponent,
    RateComponent,
    LoginComponent,
    DashboardComponent,
    WhereIsMtComponent,
    MoreAboutMtComponent,
    HomeComponent,
    ImageSliderComponent,
    FooterComponent,
    TriviaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: HttpClientModule, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    // Ensure you provide the MAT_DIALOG_DATA token with a default value
    { provide: MAT_DIALOG_DATA, useValue: {} },
    SelectedImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }