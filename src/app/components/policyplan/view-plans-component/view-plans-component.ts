import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PolicyPlanServices } from '../../../services/PolicyPlan/policy-plan-services';
import { PaginationResponseDto } from '../../../DTO/PaginationResponseDto';
import { PolicyPlanResponseDto } from '../../../DTO/PolicyPlanResponseDto';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { FilterCard } from '../../../shared/ui/filter-card/filter-card';
import { SearchBox } from '../../../shared/ui/search-box/search-box';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';
import { ActionButtons } from '../../../shared/ui/action-buttons/action-buttons';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { Role } from '../../../models/Role';
import { ToastServices } from '../../../services/toast/toast-services';
import { ActiveStatus } from '../../../models/ActiveStatus';
@Component({
  selector: 'app-view-plans-component',
  imports: [ReactiveFormsModule,NgIf,DatePipe,PageHeader,FilterCard,SearchBox,StatusBadge,ActionButtons,Pagination,LoadingSpinner,EmptyState, CurrencyPipe],
  templateUrl: './view-plans-component.html',
  styleUrl: './view-plans-component.css',
})
export class ViewPlansComponent implements OnInit {

  constructor(private planService: PolicyPlanServices,private router: Router, private cdr:ChangeDetectorRef, private toastService:ToastServices) {}
  isLoading = true;
  lstPlans!: PaginationResponseDto<PolicyPlanResponseDto>;
  role:string = localStorage.getItem('role') ?? '';
  isAdmin:boolean = this.role === Role.Admin;


  filterForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    sortBy: new FormControl('planName'),
    sortDirection: new FormControl('asc'),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(10)
  });

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans() {
    this.isLoading = true;
    const filters = this.filterForm.value;
    this.planService.listPolicyPlans(filters.pageNumber!,filters.pageSize!,filters.sortBy!,filters.sortDirection!,filters.search!).subscribe({
      next: (response) => {
        if(this.isAdmin){
          this.lstPlans = response.data;
        }
        else{
          this.lstPlans = {
            ...response.data,
            records: response.data.records.filter(d=>d.activeStatus === ActiveStatus.Active)
          }
        }
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

  searchPlans() {
    this.filterForm.patchValue({
      pageNumber: 1
    });
    this.loadPlans();
  }

  resetFilters() {
    this.filterForm.reset({
      search: '',
      sortBy: 'planName',
      sortDirection: 'asc',
      pageNumber: 1,
      pageSize: 10
    });
    this.loadPlans();
  }

  clearSearch() {
    this.filterForm.patchValue({
      search: '',
      pageNumber: 1
    });
    this.loadPlans();
  }

  previousPage() {
    if (this.lstPlans.currentPage > 1) {
      this.filterForm.patchValue({
        pageNumber: this.lstPlans.currentPage - 1
      });
      this.loadPlans();
    }

  }

  nextPage() {
    if (!this.lstPlans.isLastPage) {
      this.filterForm.patchValue({
        pageNumber: this.lstPlans.currentPage + 1
      });
      this.loadPlans();
    }
  }

  activatePlan(id: number) {
    this.planService.activatePolicyPlan(id).subscribe({
      next: (response) => {
        this.toastService.info(response.message);
        this.loadPlans();
      },
      error: (err: HttpErrorResponse) => {
        const apiError = err.error as ErrorResponseDto;
        this.toastService.error(apiError.Message);
      }
    });

  }

  deactivatePlan(id: number) {
    this.planService.deactivatePolicyPlan(id).subscribe({
      next: (response) => {
        this.toastService.info(response.message);
        this.loadPlans();
      },
      error: (err: HttpErrorResponse) => {
        const apiError = err.error as ErrorResponseDto;
        this.toastService.error(apiError.Message);
      }
    });

  }

  editPlan(id: number) {
    this.router.navigate(['/editplan', id]);
  }

  navigateToAddPlan() {
    this.router.navigate(['/addplan']);
  }

  get searchControl(): FormControl {
    return this.filterForm.get('search') as FormControl;
  }

}