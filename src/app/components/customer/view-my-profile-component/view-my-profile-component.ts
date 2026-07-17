import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SuccessResponseDto } from '../../../DTO/SuccessResponseDto';
import { CustomerResponseDto } from '../../../DTO/CustomerResponseDto';
import { CustomerServices } from '../../../services/customer/customer-services';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';

@Component({
  selector: 'app-view-my-profile-component',
  imports: [],
  templateUrl: './view-my-profile-component.html',
  styleUrl: './view-my-profile-component.css',
})
export class ViewMyProfileComponent implements OnInit {
  
  profileDetails!:SuccessResponseDto<CustomerResponseDto>;
  
  constructor(private cusService:CustomerServices){}
  ngOnInit(): void {
      this.cusService.getMyProfile().subscribe({
        next:(response)=>{
            this.profileDetails = response;
            alert('profile fetched successfully')
        }
        ,error:(err:HttpErrorResponse)=>{
          const apiError = err.error as ErrorResponseDto;
          alert(apiError.Message);
        }
      })
  }
}
