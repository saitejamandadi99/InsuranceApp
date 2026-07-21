import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../services/auth/auth-services';
import { Role } from '../../models/Role';

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

  navigateToDashboard() {
    if (this.role === Role.Admin) {
      this.router.navigate(['/admindashboard']);
    } else if (this.role === Role.Officer) {
      this.router.navigate(['/officerdashboard']);
    } else if (this.role === Role.Customer) {
      this.router.navigate(['/customerdashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(){
    this.authServices.logout();
    this.router.navigate(['/login']);
  }
}
