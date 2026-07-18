import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../services/auth/auth-services';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone:true
})
export class Navbar {
  userEmail= localStorage.getItem('userEmail');
  role = localStorage.getItem('role');

  constructor(private router:Router, private authServices:AuthServices){}

  logout(){
    this.authServices.logout();
    this.router.navigate(['/login']);
  }
}
