import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaginationResponseDto } from '../../../DTO/PaginationResponseDto';
import { PaymentResponseDto } from '../../../DTO/PaymentResponseDto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentServices } from '../../../services/Payment/payment-services';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { FilterCard } from '../../../shared/ui/filter-card/filter-card';
import { SearchBox } from '../../../shared/ui/search-box/search-box';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';
import { ActionButtons } from '../../../shared/ui/action-buttons/action-buttons';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';

@Component({
  selector: 'app-view-payments-component',
  imports: [ReactiveFormsModule, NgIf, CurrencyPipe, DatePipe, PageHeader, LoadingSpinner, FilterCard, SearchBox, StatusBadge, ActionButtons, Pagination, EmptyState],
  templateUrl: './view-payments-component.html',
  styleUrl: './view-payments-component.css',
})
export class ViewPaymentsComponent implements OnInit {

  payments!: PaginationResponseDto<PaymentResponseDto>;

  isLoading = false;

  filterForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    sortBy: new FormControl('paymentDate'),
    sortDirection: new FormControl('desc'),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(10)
  });

  constructor(private paymentService: PaymentServices,private cdr: ChangeDetectorRef,private router: Router) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.isLoading = true;

    const filters = this.filterForm.value;

    this.paymentService.listPayments(filters.pageNumber!,filters.pageSize!,filters.sortBy!,filters.sortDirection!,filters.search!).subscribe({
      next: (response) => {
        this.payments = response.data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        const apiError = err.error as ErrorResponseDto;
        alert(apiError.Message);
      }
    });
  }

  searchPayments() {
    this.filterForm.patchValue({
      pageNumber: 1
    });

    this.loadPayments();
  }

  clearSearch() {
    this.filterForm.patchValue({
      search: '',
      pageNumber: 1
    });

    this.loadPayments();
  }

  resetFilters() {
    this.filterForm.reset({
      search: '',
      sortBy: 'paymentDate',
      sortDirection: 'desc',
      pageNumber: 1,
      pageSize: 10
    });

    this.loadPayments();
  }

  previousPage() {
    if (this.payments && this.payments.currentPage > 1) {
      this.filterForm.patchValue({
        pageNumber: this.payments.currentPage - 1
      });

      this.loadPayments();
    }
  }

  nextPage() {
    if (this.payments && !this.payments.isLastPage) {
      this.filterForm.patchValue({
        pageNumber: this.payments.currentPage + 1
      });

      this.loadPayments();
    }
  }

  navigateToPaymentDetails(paymentId: number) {
    this.router.navigate(['/paymentdetails', paymentId]);
  }

  get searchControl(): FormControl {
    return this.filterForm.get('search') as FormControl;
  }

}
