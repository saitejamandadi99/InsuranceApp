import { DatePipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerResponseDto } from '../../../DTO/CustomerResponseDto';
import { CustomerServices } from '../../../services/customer/customer-services';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { PaginationResponseDto } from '../../../DTO/PaginationResponseDto';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { FilterCard } from '../../../shared/ui/filter-card/filter-card';
import { SearchBox } from '../../../shared/ui/search-box/search-box';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { Router } from '@angular/router';
import { ActionButtons } from '../../../shared/ui/action-buttons/action-buttons';

@Component({
  selector: 'app-view-customers-component',
  imports: [ReactiveFormsModule, DatePipe, PageHeader, FilterCard, SearchBox, Pagination, LoadingSpinner,EmptyState, ActionButtons],
  templateUrl: './view-customers-component.html',
  styleUrl: './view-customers-component.css',
})
export class ViewCustomersComponent implements OnInit {

  filterForm:FormGroup= new FormGroup({
    search:new FormControl(''),
    sortBy:new FormControl('fullName'),
    sortDirection:new FormControl('asc'),
    pageNumber:new FormControl(1),
    pageSize:new FormControl(10)
  });

  customers!:PaginationResponseDto<CustomerResponseDto>;
  isLoading=false;

  searchCustomers(){

  this.filterForm.patchValue({
    pageNumber:1
  });

  this.loadCustomers();

}

  previousPage(){
    if(this.customers &&  this.customers.currentPage>1){
      this.filterForm.patchValue({
        pageNumber:this.customers.currentPage -1
      });

      this.loadCustomers();
    }
  }

  nextPage(){
    if(this.customers && !this.customers.isLastPage){
      this.filterForm.patchValue({
        pageNumber:this.customers.currentPage+1
      });
      this.loadCustomers();
    }
  }

  constructor(private cusService:CustomerServices, private router:Router, private cdr:ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(){
    this.isLoading=true;
    const filters = this.filterForm.value;
    this.cusService.listCustomers(filters.pageNumber!, filters.pageSize!, filters.sortBy!, filters.sortDirection!, filters.search!).subscribe({
        next:(response)=>{
            this.customers = response.data;
            this.isLoading=false;
            this.cdr.detectChanges();
        },error:(err:HttpErrorResponse)=>{
          this.isLoading=false;
          const apiError = err.error as ErrorResponseDto;
          alert(apiError.Message);
        }
      })
  }

  viewCustomer(customerId: number) {
    this.router.navigate(['/customerdetails', customerId]);
  }

  get searchControl():FormControl{
    return this.filterForm.get('search') as FormControl;
  }

  resetFilters(){

  this.filterForm.reset({
    search:'',
    sortBy:'fullName',
    sortDirection:'asc',
    pageNumber:1,
    pageSize:10
  });

  this.loadCustomers();

}

clearSearch(){

  this.filterForm.patchValue({
    search:'',
    pageNumber:1
  });

  this.loadCustomers();

}

navigateToAddCustomer(){

    this.router.navigate(['/createprofile']);

}
}
