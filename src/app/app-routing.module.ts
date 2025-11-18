import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./components/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./auth.guard";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {AddOffreComponent} from "./components/add-offre/add-offre.component";
import {CvComponent} from "./components/cv/cv.component";
import {ContactComponent} from "./components/contact/contact.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'contact', component: ContactComponent },

  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: "editProfile", component: EditProfileComponent, canActivate: [AuthGuard]  },
  { path: "addOffre", component: AddOffreComponent, canActivate: [AuthGuard]  },
  { path: "cv", component: CvComponent, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
