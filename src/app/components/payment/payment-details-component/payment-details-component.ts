import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentServices } from '../../../services/Payment/payment-services';
import { PaymentResponseDto } from '../../../DTO/PaymentResponseDto';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';
import { ToastServices } from '../../../services/toast/toast-services';

@Component({
  selector: 'app-payment-details-component',
  imports: [NgIf,DatePipe,CurrencyPipe,PageHeader,LoadingSpinner,StatusBadge  ],
  templateUrl: './payment-details-component.html',
  styleUrl: './payment-details-component.css'
})
export class PaymentDetailsComponent implements OnInit {

  constructor(private paymentService: PaymentServices,private activatedRoute: ActivatedRoute,private router: Router,private cdr: ChangeDetectorRef, private toastService:ToastServices) {}

  paymentId!: number;
  payment!: PaymentResponseDto;
  isLoading = false;
  ngOnInit(): void {
    this.paymentId = Number(this.activatedRoute.snapshot.params['paymentId']);
    if (isNaN(this.paymentId)) {
      this.router.navigate(['/viewpayments']);
      return;
    }
    this.loadPayment();
  }

  loadPayment() {
    this.isLoading = true;
    this.paymentService.getPaymentById(this.paymentId).subscribe({
      next: (response) => {
        this.payment = response.data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        const apiError = err.error as ErrorResponseDto;
        this.toastService.error(apiError.Message);
      }
    });

  }

  navigateBack() {
    this.router.navigate(['/viewpayments']);
  }

}