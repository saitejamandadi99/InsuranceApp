import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';
import { ActionButtons } from '../../../shared/ui/action-buttons/action-buttons';
import { PaymentServices } from '../../../services/Payment/payment-services';
import { Router } from '@angular/router';
import { PaymentResponseDto } from '../../../DTO/PaymentResponseDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { ToastServices } from '../../../services/toast/toast-services';

@Component({
  selector: 'app-view-my-payments-component',
  imports: [NgIf, CurrencyPipe, DatePipe, PageHeader, LoadingSpinner, EmptyState, StatusBadge,ActionButtons],
  templateUrl: './view-my-payments-component.html',
  styleUrl: './view-my-payments-component.css',
})
export class ViewMyPaymentsComponent implements OnInit {
  constructor(private paymentService:PaymentServices, private router:Router, private cdr:ChangeDetectorRef, private toastServices:ToastServices){}

  isLoading=false;
  payments:PaymentResponseDto[]= [];

  loadPayments(){
    this.isLoading=true;
    this.paymentService.getMyPayments().subscribe({
      next:(response)=>{
        this.payments = response.data ?? [];
        this.isLoading=false;
        this.cdr.detectChanges();
      },error:(err:HttpErrorResponse)=>{
        this.isLoading=false;
        const apiError=err.error as ErrorResponseDto;
        this.toastServices.error(apiError.Message);
      }
    })
  }

  ngOnInit(): void {
      this.loadPayments();
  }


  navigateToPaymentDetails(paymentId:number){
    this.router.navigate(['/paymentdetails', paymentId])
  }
}
