import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './components/popup/popup.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { FilterPipe } from './pipes/filter.pipe';
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {JwtInterceptor} from "./auth/jwt.interceptor";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddOffreComponent } from './components/add-offre/add-offre.component';
import {MatCardModule} from "@angular/material/card";
import { SearchOffreByPipe } from './pipes/search-offre-by.pipe';
import { OffresComponent } from './components/offres/offres.component';
import { PostulationsComponent } from './components/postulations/postulations.component';
import { CvComponent } from './components/cv/cv.component';
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import { SearchPostPipe } from './pipes/search-post.pipe';
import {AuthGuard} from "./auth.guard";
import {ToastrModule} from "ngx-toastr";
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PopupComponent,
    HeaderComponent,
    FooterComponent,
    FilterPipe,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EditProfileComponent,
    ProfileComponent,
    AddOffreComponent,
    SearchOffreByPipe,
    OffresComponent,
    PostulationsComponent,
    CvComponent,
    SearchPostPipe,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    NgxExtendedPdfViewerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      preventDuplicates: true
    })
  ],
  providers: [
     AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
