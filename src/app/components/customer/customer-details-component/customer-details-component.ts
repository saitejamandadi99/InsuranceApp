import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SuccessResponseDto } from '../../../DTO/SuccessResponseDto';
import { CustomerResponseDto } from '../../../DTO/CustomerResponseDto';
import { CustomerServices } from '../../../services/customer/customer-services';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { DatePipe } from '@angular/common';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';

@Component({
  selector: 'app-customer-details-component',
  imports: [DatePipe, PageHeader, LoadingSpinner],
  templateUrl: './customer-details-component.html',
  styleUrl: './customer-details-component.css',
})
export class CustomerDetailsComponent implements OnInit  {

  id!:number;
  profileDetails!:SuccessResponseDto<CustomerResponseDto>;
  isLoading=true;
  constructor(private cusService:CustomerServices, private activedRoute : ActivatedRoute, private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
    this.id= this.activedRoute.snapshot.params['id'];
      this.cusService.getCustomerDetailsById(this.id).subscribe({
        next:(response)=>{
            this.profileDetails = response;
            this.isLoading=false;
            this.cdr.detectChanges();
            alert('profile fetched successfully')
        },error:(err:HttpErrorResponse)=>{
          this.isLoading=false;
          const apiError = err.error as ErrorResponseDto;
          alert(apiError.Message);
        }
      })
  }
}