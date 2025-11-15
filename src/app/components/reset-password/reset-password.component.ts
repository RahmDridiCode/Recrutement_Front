import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  url = environment.apiUrl
  password = '';
  message = '';
  token: string | null = '';
  isError = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  submit() {
    if (!this.token) return;
    this.http.post(this.url +"reset-password", { token: this.token, password: this.password })
      .subscribe({
        next: () =>  {
          this.message = 'Password updated successfully';
          this.isError=false;},
        error: () =>  {
          this.message = 'Invalid or expired token';
          this.isError = true; // erreur
        }
      });
  }

  ngOnInit(): void {
  }

}
