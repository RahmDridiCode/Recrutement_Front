import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  constructor(public AuthService: AuthService) { }

  ngOnInit(): void {
    this.user = this.AuthService.loggedUser;
    if (!this.user.keywords) {
      this.user.keywords = [];
    }
  }

  getFileName(path: string): string {
    if (!path) return '';
    // split sur slash / ou backslash \
    return path.split(/(\/|\\)/g).pop() || '';
  }




}
