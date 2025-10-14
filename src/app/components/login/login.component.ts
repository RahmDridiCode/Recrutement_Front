import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  erreur = 0;
  invalid = false;
  connexion = new FormGroup({
    email: new FormControl('', [Validators.required]),
    mdp: new FormControl('', [Validators.required]),

  });


  constructor(private auth: AuthService,
              public router: Router) { }

  ngOnInit(): void {
    this.auth.getError().subscribe((result: any) => {
      this.erreur = result;
    })
  }

  onLoggedin() {

    if (this.connexion.valid) {
      console.log("email: " + this.connexion.value.email);
      console.log("password: " + this.connexion.value.mdp);
      this.auth.signIn(this.connexion.value.email, this.connexion.value.mdp).subscribe((result : any) => {
          this.auth.setUserInfo(result);
          if (result.user.role == "ADMIN") {
            this.router.navigate(['/dashbord/users'])
            return;
          } else {
            this.router.navigate(['/'])
          }
        },
        error => {
          error = 1;
        })
    } else {
      this.invalid = true;
    }

  }

}
