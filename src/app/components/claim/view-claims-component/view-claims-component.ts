import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ClaimServices } from '../../../services/Claim/claim-services';

import { ClaimResponseDto } from '../../../DTO/ClaimResponseDto';
import { PaginationResponseDto } from '../../../DTO/PaginationResponseDto';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';

import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { FilterCard } from '../../../shared/ui/filter-card/filter-card';
import { SearchBox } from '../../../shared/ui/search-box/search-box';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';
import { ActionButtons } from '../../../shared/ui/action-buttons/action-buttons';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';

@Component({
  selector: 'app-view-claims-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    PageHeader,
    FilterCard,
    SearchBox,
    Pagination,
    LoadingSpinner,
    EmptyState,
    StatusBadge,
    ActionButtons,
    CurrencyPipe, 
    DatePipe
  ],
  templateUrl: './view-claims-component.html',
  styleUrl: './view-claims-component.css'
})
export class ViewClaimsComponent implements OnInit {

  filterForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    sortBy: new FormControl('createdDate'),
    sortDirection: new FormControl('desc'),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(10)
  });

  claims!: PaginationResponseDto<ClaimResponseDto>;

  isLoading = false;

  constructor(
    private claimService: ClaimServices,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims() {

    this.isLoading = true;

    const filters = this.filterForm.value;

    this.claimService.listClaims(
      filters.pageNumber!,
      filters.pageSize!,
      filters.sortBy!,
      filters.sortDirection!,
      filters.search!
    ).subscribe({

      next: (response) => {

        this.claims = response.data;

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

  searchClaims() {

    this.filterForm.patchValue({
      pageNumber: 1
    });

    this.loadClaims();

  }

  previousPage() {

    if (this.claims && this.claims.currentPage > 1) {

      this.filterForm.patchValue({
        pageNumber: this.claims.currentPage - 1
      });

      this.loadClaims();

    }

  }

  nextPage() {

    if (this.claims && !this.claims.isLastPage) {

      this.filterForm.patchValue({
        pageNumber: this.claims.currentPage + 1
      });

      this.loadClaims();

    }

  }

 navigateToReview(claimId: number) {

  const role = localStorage.getItem('role');

  if (role === 'Officer') {

    this.router.navigate(['/officerreview', claimId]);

  }

  else if (role === 'Admin') {

    this.router.navigate(['/adminreview', claimId]);

  }

}

  get searchControl(): FormControl {

    return this.filterForm.get('search') as FormControl;

  }

  resetFilters() {

    this.filterForm.reset({
      search: '',
      sortBy: 'createdDate',
      sortDirection: 'desc',
      pageNumber: 1,
      pageSize: 10
    });

    this.loadClaims();

  }

  clearSearch() {

    this.filterForm.patchValue({
      search: '',
      pageNumber: 1
    });

    this.loadClaims();

  }

}