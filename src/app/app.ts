import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserServices } from './services/user/user-services';
import { AuthServices } from './services/auth/auth-services';
import { Navbar } from './shared/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('InsuranceApp');
  constructor(private service : AuthServices, private router:Router){}

  logout(){
    this.service.logout();
    this.router.navigate(['login']);
  }

}
