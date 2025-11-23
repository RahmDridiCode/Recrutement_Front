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
import {DashEtudiantComponent} from "./components/dash-etudiant/dash-etudiant.component";
import {DashRecruterComponent} from "./components/dash-recruter/dash-recruter.component";
import {OffresComponent} from "./components/offres/offres.component";
import {PostulationsComponent} from "./components/postulations/postulations.component";
import {RoleGuard} from "./guards/role.guard";
import {MotivationComponent} from "./components/motivation/motivation.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard]  },

  { path: "editProfile", component: EditProfileComponent, canActivate: [AuthGuard]  },
  { path: "addOffre", component: AddOffreComponent, canActivate: [AuthGuard]  },
  { path: "cv", component: CvComponent, canActivate: [AuthGuard]},
  { path: "motivation", component: MotivationComponent, canActivate: [AuthGuard]},
  { path: "myPostulations", component: DashEtudiantComponent, canActivate: [AuthGuard, RoleGuard],
    data: { role: 'STUDENT' } },

  {
    path: "dashbordRecruter", component: DashRecruterComponent, canActivate: [AuthGuard, RoleGuard],
    data: { role: 'RECRUTER' } , children: [
      { path: "", component: DashRecruterComponent },
      { path: "offres", component: OffresComponent },
      { path: "postulations", component: PostulationsComponent },

    ]
  },
  // Redirection wildcard vers login si URL inconnue
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
