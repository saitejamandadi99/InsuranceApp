import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { PolicyResponseDto } from '../../../DTO/PolicyResponseDto';
import { PolicyServices } from '../../../services/Policy/policy-services';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';
import { Router } from '@angular/router';
import { PaginationResponseDto } from '../../../DTO/PaginationResponseDto';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { FilterCard } from '../../../shared/ui/filter-card/filter-card';
import { SearchBox } from '../../../shared/ui/search-box/search-box';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { ActionButtons } from '../../../shared/ui/action-buttons/action-buttons';
import { PolicyStatus } from '../../../models/PolicyStatus';


@Component({
  selector: 'app-view-policies-component',
  imports: [ReactiveFormsModule, NgIf, PageHeader, LoadingSpinner, StatusBadge, DatePipe, CurrencyPipe,EmptyState, FilterCard, SearchBox, Pagination, ActionButtons],
  templateUrl: './view-policies-component.html',
  styleUrl: './view-policies-component.css',
})
export class ViewPoliciesComponent implements OnInit {
  
  constructor(private policyService:PolicyServices, private cdr: ChangeDetectorRef, private router:Router){}
  
  lstPolicies!: PaginationResponseDto<PolicyResponseDto>;
  isLoading=false;
  PolicyStatus = PolicyStatus;


  ngOnInit(): void {
   this.loadPolicies();
  }

  filterForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    sortBy: new FormControl('planName'),
    sortDirection: new FormControl('asc'),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(10)
  });

  searchPolicies() {
    this.filterForm.patchValue({
      pageNumber: 1
    });
    this.loadPolicies();
  }

  resetFilters() {
    this.filterForm.reset({
      search: '',
      sortBy: 'planName',
      sortDirection: 'asc',
      pageNumber: 1,
      pageSize: 10
    });
    this.loadPolicies();
  }

  clearSearch() {
    this.filterForm.patchValue({
      search: '',
      pageNumber: 1
    });
    this.loadPolicies();
  }

  previousPage() {
    if (this.lstPolicies.currentPage > 1) {
      this.filterForm.patchValue({
        pageNumber: this.lstPolicies.currentPage - 1
      });
      this.loadPolicies();
    }

  }

  nextPage() {
    if (!this.lstPolicies.isLastPage) {
      this.filterForm.patchValue({
        pageNumber: this.lstPolicies.currentPage + 1
      });
      this.loadPolicies();
    }
  }
  
  loadPolicies(){
     this.isLoading=true;
     const filters = this.filterForm.value;
      this.policyService.listPolicies(filters.pageNumber!, filters.pageSize!, filters.sortBy!, filters.sortDirection!, filters.search!).subscribe({
        next:(response)=>{
          this.lstPolicies = response.data;
          this.isLoading=false;
          this.cdr.detectChanges();
        },error:(err:HttpErrorResponse)=>{
          this.isLoading=false;
          const apiError = err.error as ErrorResponseDto;
          alert(apiError.Message);
        }
      })
  }

  navigateToIssuePolicy(){
  this.router.navigate(['/issuepolicy']);
}

get searchControl(): FormControl {
    return this.filterForm.get('search') as FormControl;
  }

  cancelPolicy(policyId: number) {
  const confirmed = confirm('Are you sure you want to cancel this policy?');
  if (!confirmed) {
    return;
  }
  this.isLoading = true;
  this.policyService.cancelPolicy(policyId).subscribe({
    next: (response) => {
      this.isLoading = false;
      alert(response.message);
      this.loadPolicies();
    },error: (err: HttpErrorResponse) => {
      this.isLoading = false;
      const apiError = err.error as ErrorResponseDto;
      alert(apiError.Message);
    }
  });
}
}
