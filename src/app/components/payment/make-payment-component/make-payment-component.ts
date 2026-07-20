import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { ActionButtons } from '../../../shared/ui/action-buttons/action-buttons';
import { PaymentServices } from '../../../services/Payment/payment-services';
import { PolicyServices } from '../../../services/Policy/policy-services';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyResponseDto } from '../../../DTO/PolicyResponseDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { PaymentMode } from '../../../models/PaymentMode';
import { Role } from '../../../models/Role';
import { PaymentRequestDto } from '../../../DTO/PaymentRequestDto';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';

@Component({
  selector: 'app-make-payment-component',
  imports: [ReactiveFormsModule, NgIf, DatePipe, CurrencyPipe, PageHeader, LoadingSpinner, ActionButtons, StatusBadge],
  templateUrl: './make-payment-component.html',
  styleUrl: './make-payment-component.css',
})
export class MakePaymentComponent implements OnInit {
  constructor(private payService: PaymentServices, private policyService: PolicyServices, private activatedRoutes: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {}

  policyId!: number;
  role!: string;
  isLoading = false;

  policy!: PolicyResponseDto;

  paymentForm: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
    paymentMode: new FormControl('', [Validators.required]),
    transactionReference: new FormControl('', [Validators.required]),
  });

  PaymentMode = PaymentMode;
  paymentModes = Object.values(PaymentMode);

  ngOnInit(): void {
    this.role = localStorage.getItem('role') ?? '';
    this.policyId = Number(this.activatedRoutes.snapshot.params['policyId']);
    if (isNaN(this.policyId)) {
      if (this.role === Role.Customer) {
        this.router.navigate(['/mypolicies']);
      } else {
        this.router.navigate(['/viewpolicies']);
      }
      return;
    }

    this.loadPolicy();
  }

  loadPolicy() {
    this.isLoading = true;
    this.policyService.getPolicyById(this.policyId).subscribe({
      next: (response) => {
        this.policy = response.data;
        this.isLoading = false;

        this.paymentForm.get('amount')?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(this.remainingAmount),
        ]);
        this.paymentForm.get('amount')?.updateValueAndValidity();

        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        const apiError = err.error as ErrorResponseDto;
        alert(apiError.Message);
      },
    });
  }

  get remainingAmount(): number {
    if (!this.policy) return 0;
    return this.policy.premiumAmount - this.policy.totalPremiumPaid;
  }

  makePayment() {
    this.isLoading = true;
    const request: PaymentRequestDto = this.paymentForm.value;
    request.policyId = this.policyId;
    if (this.role === Role.Customer) {
      this.payService.addMyPayment(request).subscribe({
        next: (response) => {
          this.isLoading = false;
          alert(response.message);
          this.router.navigate(['/mypayments']);
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          const apiError = err.error as ErrorResponseDto;
          alert(apiError.Message);
        },
      });
    } else {
      this.payService.addOfficerPayment(request).subscribe({
        next: (response) => {
          this.isLoading = false;
          alert(response.message);
          this.router.navigate(['/viewpayments']);
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          const apiError = err.error as ErrorResponseDto;
          alert(apiError.Message);
        },
      });
    }
  }

  navigateBack() {
    if (this.role === Role.Customer) {
      this.router.navigate(['/mypolicies']);
    } else {
      this.router.navigate(['/viewpolicies']);
    }
  }

  get amount(): FormControl {
    return this.paymentForm.get('amount') as FormControl;
  }

  get paymentMode(): FormControl {
    return this.paymentForm.get('paymentMode') as FormControl;
  }

  get transactionReference(): FormControl {
    return this.paymentForm.get('transactionReference') as FormControl;
  }
}