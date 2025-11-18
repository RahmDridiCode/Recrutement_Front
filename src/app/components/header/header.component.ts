import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;
  defaultAvatar = 'https://ssl.gstatic.com/accounts/ui/avatar_2x.png';

  constructor(public auth: AuthService,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    const storedTheme = localStorage.getItem('theme');
    this.isDarkMode = storedTheme ? storedTheme === 'dark' : this.document.documentElement.classList.contains('dark');
    this.syncThemeClass();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.syncThemeClass();
  }

  private syncThemeClass(): void {
    if (this.isDarkMode) {
      this.renderer.addClass(this.document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark');
    }
  }


  logout(){
    this.auth.logout();
  }

}
