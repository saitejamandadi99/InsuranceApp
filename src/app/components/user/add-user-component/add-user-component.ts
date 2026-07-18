import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SuccessResponseDto } from '../../../DTO/SuccessResponseDto';
import { UserRequestDto } from '../../../DTO/UserRequestDto';
import { UserResponseDto } from '../../../DTO/UserResponseDto';
import { UserServices } from '../../../services/user/user-services';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { NgIf } from '@angular/common';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
@Component({
  selector: 'app-add-user-component',
  imports: [ReactiveFormsModule, NgIf, PageHeader],
  templateUrl: './add-user-component.html',
  styleUrl: './add-user-component.css',
})
export class AddUserComponent {

  addUser$:Observable<SuccessResponseDto<UserResponseDto>> = of();

  userForm:FormGroup=new FormGroup({
    fullName:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    mobileNumber:new FormControl('', [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]),
  });

  constructor(private userService:UserServices, private router:Router){}

  addUser(){
    const request:UserRequestDto = this.userForm.value;
    this.addUser$ = this.userService.postUser(request); 
    this.addUser$.subscribe({
      next:(response)=>{
        alert(response.message);
        this.router.navigate(['viewusers'])
      },error:(err:HttpErrorResponse)=>{
        const apiError = err.error as ErrorResponseDto;
        alert(apiError.Message);

      }
    })
  }

  navigateToUsers(){
    this.router.navigate(['/viewusers']);
}

  getfullName():FormControl{
    return this.userForm.get('fullName') as FormControl;
  }

  getemail():FormControl{
    return this.userForm.get('email') as FormControl;
  }

  getpassword():FormControl{
    return this.userForm.get('password') as FormControl;
  }

  getmobileNumber():FormControl{
    return this.userForm.get('mobileNumber') as FormControl;
  }
}
