import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  url = environment.apiUrl
  // Déclaration du formulaire réactif
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  message = '';
  isError = false;


  constructor(private http: HttpClient) {}

  submit() {
    if (this.forgotPasswordForm.invalid) {
      this.message = '⚠️ Please enter a valid email address.';
      this.isError = true;
      return;
    }
    const email = this.forgotPasswordForm.value.email;


    this.http.post(this.url + "forgot-password", { email })
      .subscribe({
        next: () => {
          this.message = 'Reset link sent to your email';
          this.isError = false; // succès
        },
        error: (err) => {
          if (err.status === 404 || err.status === 400) {
            this.message = 'Email not found.';
          } else {
            this.message = 'An error occurred. Please try again later.';
          }
          this.isError = true;
        }
      });
  }

  ngOnInit(): void {
  }

}
