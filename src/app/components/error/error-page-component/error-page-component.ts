import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../../models/Role';

@Component({
  selector: 'app-error-page-component',
  standalone:true,
  imports: [],
  templateUrl: './error-page-component.html',
  styleUrl: './error-page-component.css',
})
export class ErrorPageComponent {
  role=localStorage.getItem('role');
  constructor(private router:Router){}
  navigateToDashboard(){
    if(this.role===Role.Admin){
      this.router.navigate(['/admindashboard'])
    }
    else if(this.role===Role.Officer){
      this.router.navigate(['/officerdashboard'])
    }
    else if(this.role===Role.Customer){
      this.router.navigate(['/admindashboard'])
    }
    else{
      this.router.navigate(['/login'])
    }

  }
}
