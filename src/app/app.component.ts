import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import SwiperCore, { Navigation } from 'swiper';

// Installer le module Navigation
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recrutement-front';

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.autoAuthUser();
  }
}
