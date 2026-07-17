import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CustomerServices } from '../../../services/customer/customer-services';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { CustomerRequestDto } from '../../../DTO/CustomerRequestDto';

@Component({
  selector: 'app-add-customer-profile-component',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-customer-profile-component.html',
  styleUrl: './add-customer-profile-component.css',
})
export class AddCustomerProfileComponent {

  customerForm:FormGroup=new FormGroup({
    dateOfBirth: new FormControl('', [Validators.required, this.dateValidator]),
    address: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
    state: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    pincode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{6}$")]),
    nomineeName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    nomineeRelationship: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  });

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

  constructor(private cusService:CustomerServices, private router:Router){}

  addCustomerProfile(){
    const request:CustomerRequestDto = this.customerForm.value;
    this.cusService.addCustomerProfile(request).subscribe({
      next:(response)=>{
        alert(response.message);
        this.router.navigate(['/myprofile']);
      },error:(err:HttpErrorResponse)=>{
        const apiError = err.error as ErrorResponseDto
        alert(apiError.Message);
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

}
