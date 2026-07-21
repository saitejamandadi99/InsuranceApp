import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SuccessResponseDto } from '../../../DTO/SuccessResponseDto';
import { CustomerResponseDto } from '../../../DTO/CustomerResponseDto';
import { CustomerServices } from '../../../services/customer/customer-services';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { DatePipe } from '@angular/common';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { ToastServices } from '../../../services/toast/toast-services';

@Component({
  selector: 'app-view-my-profile-component',
  imports: [DatePipe, PageHeader, LoadingSpinner],
  templateUrl: './view-my-profile-component.html',
  styleUrl: './view-my-profile-component.css',
})
export class ViewMyProfileComponent implements OnInit {
  
  profileDetails!:SuccessResponseDto<CustomerResponseDto>;
  isLoading=true;
  
  constructor(private cusService:CustomerServices, private cdr:ChangeDetectorRef, private toastService:ToastServices){}
  ngOnInit(): void {
      this.cusService.getMyProfile().subscribe({
        next:(response)=>{
            console.log(response);
            console.log(response.data);
            this.profileDetails = response;
            this.isLoading=false;
            this.cdr.detectChanges();
        }
        ,error:(err:HttpErrorResponse)=>{
          this.isLoading=false;
          const apiError = err.error as ErrorResponseDto;
          this.toastService.error(apiError.Message);
        }
      })
  }
}
