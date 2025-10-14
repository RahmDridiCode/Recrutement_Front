import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  invalid=false;

  signupForm = new FormGroup({
    nom: new FormControl('',[Validators.required]),
    prenom: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    mdp: new FormControl('',[Validators.required]),
    telephone: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    role: new FormControl('',[Validators.required]),
  });

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {

  }

  inscrit(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value)
      this.auth.register(this.signupForm.value);
    }else{
      this.invalid=true;
    }
  }


}
