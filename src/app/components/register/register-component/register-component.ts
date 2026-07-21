import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { RegisterResponseDto } from '../../../DTO/RegisterResponseDto';
import { AuthServices } from '../../../services/auth/auth-services';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { RegisterRequestDto } from '../../../DTO/RegisterRequestDto';
import { ToastServices } from '../../../services/toast/toast-services';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule ,NgIf, RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  registerResponse$: Observable<RegisterResponseDto> = of();
  registerForm:FormGroup=new FormGroup({
    fullName:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$!]).{8,20}$'), ]),
    mobileNumber:new FormControl('', [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]),
  });



  constructor(private authService: AuthServices, private router:Router, private toastService:ToastServices){}

  registerUser(){
    const request:RegisterRequestDto= this.registerForm.value;
    this.registerResponse$ = this.authService.registerUser(request);
    this.registerResponse$.subscribe({
      next:(response)=>{

        this.toastService.success(response.message);
        this.router.navigate(['/login']);

      },
       error:(err:HttpErrorResponse)=>{
        const apiError = err.error as ErrorResponseDto;
        this.toastService.error(apiError.Message);
      }
    })
  }
}
