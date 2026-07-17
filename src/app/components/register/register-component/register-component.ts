import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { RegisterResponseDto } from '../../../DTO/RegisterResponseDto';
import { AuthServices } from '../../../services/auth/auth-services';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule ,NgIf],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  registerResponse$: Observable<RegisterResponseDto> = of();
  registerForm:FormGroup=new FormGroup({
    fullName:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    mobileNumber:new FormControl('', [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]),
  });



  constructor(private authService: AuthServices, private router:Router){}

  registerUser(){
    this.registerResponse$ = this.authService.registerUser(this.registerForm.value);
    this.registerResponse$.subscribe({
      next:(response)=>{

        alert(response.message);
        this.router.navigate(['/login']);

      },
       error:(err:HttpErrorResponse)=>{
        const apiError = err.error as ErrorResponseDto;
        alert(apiError.Message);
      }
    })
  }
}
