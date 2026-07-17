import { Component, OnInit } from '@angular/core';
import { SuccessResponseDto } from '../../../DTO/SuccessResponseDto';
import { CustomerResponseDto } from '../../../DTO/CustomerResponseDto';
import { CustomerServices } from '../../../services/customer/customer-services';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';

@Component({
  selector: 'app-customer-details-component',
  imports: [],
  templateUrl: './customer-details-component.html',
  styleUrl: './customer-details-component.css',
})
export class CustomerDetailsComponent implements OnInit  {

  id!:number;
  profileDetails!:SuccessResponseDto<CustomerResponseDto>;
  
  constructor(private cusService:CustomerServices, private activedRoute : ActivatedRoute){}
  ngOnInit(): void {
    this.id= this.activedRoute.snapshot.params['id'];
      this.cusService.getCustomerDetailsByUserId(this.id).subscribe({
        next:(response)=>{
            this.profileDetails = response;
            alert('profile fetched successfully')
        },error:(err:HttpErrorResponse)=>{
          const apiError = err.error as ErrorResponseDto;
          alert(apiError.Message);
        }
      })
  }
}