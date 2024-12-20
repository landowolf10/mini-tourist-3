import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMtCardsComponent } from './about-mt-cards/about-mt-cards.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MoreAboutMtComponent } from './more-about-mt/more-about-mt.component';
import { WhereIsMtComponent } from './where-is-mt/where-is-mt.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { TriviaComponent } from './trivia/trivia.component';
import { CreateMemberComponent } from './create-member/create-member.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { authGuard } from './auth.guard';
import { MemberAdminDashboardComponent } from './member-admin-dashboard/member-admin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about-mt', component: AboutMtCardsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canMatch: [authGuard] },
  { path: 'where-is-mt', component: WhereIsMtComponent },
  { path: 'more-about-mt', component: MoreAboutMtComponent },
  { path: 'image-slider', component: ImageSliderComponent },
  { path: 'deals', component: TriviaComponent },
  { path: 'create-member', component: CreateMemberComponent },
  { path: 'member-dashboard', component: MemberDashboardComponent, canMatch: [authGuard] },
  { path: 'member-admin-dashboard', component: MemberAdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
