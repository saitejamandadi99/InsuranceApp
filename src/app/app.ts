import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserServices } from './services/user/user-services';
import { AuthServices } from './services/auth/auth-services';
import { Navbar } from './shared/navbar/navbar';
import { SidebarComponent } from './components/sidebar/sidebar-component/sidebar-component';
import { ToastComponent } from './components/toast/toast-component/toast-component';
import { ToastType } from './models/ToastType';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, NgIf, SidebarComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('InsuranceApp');
  constructor(private service: AuthServices, private router: Router) {}

  get isLoggedIn(): boolean {
    return !!this.service.getToken();
  }

  logout() {
    this.service.logout();
    this.router.navigate(['login']);
  }
}