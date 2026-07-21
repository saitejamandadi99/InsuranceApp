import { NgIf } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CustomerServices } from '../../../services/customer/customer-services';
import {Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { CustomerRequestDto } from '../../../DTO/CustomerRequestDto';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { ToastServices } from '../../../services/toast/toast-services';

@Component({
  selector: 'app-edit-customer-profile-component',
  imports: [ReactiveFormsModule, NgIf, PageHeader],
  templateUrl: './edit-customer-profile-component.html',
  styleUrl: './edit-customer-profile-component.css',
})
export class EditCustomerProfileComponent implements OnInit {
  customerForm:FormGroup=new FormGroup({
    dateOfBirth: new FormControl('', [Validators.required, this.dateValidator]),
    address: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
    state: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    pincode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{6}$")]),
    nomineeName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    nomineeRelationship: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  });

  ngOnInit(): void {
     
      this.cusService.getMyProfile().subscribe({
        next:(response)=>{
          this.customerForm.patchValue(response.data);
        },
        error:(err:HttpErrorResponse)=>{
          const apiError = err.error as ErrorResponseDto;
          this.toastService.error(apiError.Message);
        }
      })
  }

  dateValidator(control:AbstractControl):ValidationErrors|null{
    if (!control.value) {
    return null;
  }
    const dob = new Date(control.value);
    const today = new Date();
    today.setHours(0,0,0,0);
    if(dob >=today){
      return {invalidDate : true}
    }
    return null;
  }

  constructor(private cusService:CustomerServices, private router:Router, private toastService:ToastServices){}

  updateCustomerProfile(){
    const request:CustomerRequestDto= this.customerForm.value;
    this.cusService.updateCustomerProfile(request).subscribe({
      next:(response)=>{
        this.toastService.info(response.message);
        this.router.navigate(['/myprofile']);
      },error:(err:HttpErrorResponse)=>{
        const apiError = err.error as ErrorResponseDto
        this.toastService.error(apiError.Message);
      }
    })
  }

  get dateOfBirth():FormControl{
    return this.customerForm.get('dateOfBirth') as FormControl;
  }

  get address():FormControl{
    return this.customerForm.get('address') as FormControl;
  }

  get state():FormControl{
    return this.customerForm.get('state') as FormControl;
  }

  get city():FormControl{
    return this.customerForm.get('city') as FormControl;
  }

  get pincode():FormControl{
    return this.customerForm.get('pincode') as FormControl;
  }

  get nomineeName():FormControl{
    return this.customerForm.get('nomineeName') as FormControl;
  }

  get nomineeRelationship():FormControl{
    return this.customerForm.get('nomineeRelationship') as FormControl;
  }

  navigateToProfile() {
  this.router.navigate(['/myprofile']);
}
}
