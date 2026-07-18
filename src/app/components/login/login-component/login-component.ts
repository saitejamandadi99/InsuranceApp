import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { LoginResponseDto } from '../../../DTO/LoginResponseDto';
import { AuthServices } from '../../../services/auth/auth-services';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { Role } from '../../../models/Role';
import { LoginRequestDto } from '../../../DTO/LoginRequestDto';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginResponse$:Observable<LoginResponseDto> = of();
  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required]),
  });

  constructor(private authService:AuthServices, private router:Router){}

  loginUser(){
    const request : LoginRequestDto = this.loginForm.value;
    this.loginResponse$ = this.authService.loginUser(request);
    this.loginResponse$.subscribe({
      next:(response)=>{
        this.authService.saveToken(response)
        const role = this.authService.getRole();
        if(role === Role.Admin){
            console.log("Navigate to admin");
            this.router.navigate(['/admindashboard']);
        }
        else if(role === Role.Officer){
          this.router.navigate(['/officerdashboard'])
        }
        else if(role === Role.Customer){
          this.router.navigate(['/customerdashboard'])
        }
      },
      error:(err:HttpErrorResponse)=>{
        const apiError = err.error as ErrorResponseDto;
        alert(apiError.Message);
      }
    })
  }
}
