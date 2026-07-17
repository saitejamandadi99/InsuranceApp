import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerResponseDto } from '../../../DTO/CustomerResponseDto';
import { CustomerServices } from '../../../services/customer/customer-services';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { PaginationResponseDto } from '../../../DTO/PaginationResponseDto';

@Component({
  selector: 'app-view-customers-component',
  imports: [ReactiveFormsModule, NgIf],
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
  searchCustomers(){
    this.filterForm.patchValue({
      pageNumber:1,
    })
    this.loadCustomers();
  }

  previousPage(){
    if(this.customers.currentPage>1){
      this.filterForm.patchValue({
        pageNumber:this.customers.currentPage -1
      });

      this.loadCustomers();
    }
  }

  nextPage(){
    if(!this.customers.isLastPage){
      this.filterForm.patchValue({
        pageNumber:this.customers.currentPage+1
      });
      this.loadCustomers();
    }
  }

  constructor(private cusService:CustomerServices){}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(){
    const filters = this.filterForm.value;
    this.cusService.listCustomers(filters.pageNumber!, filters.pageSize!, filters.sortBy!, filters.sortDirection!, filters.search!).subscribe({
        next:(response)=>{
            this.customers = response.data;
        },error:(err:HttpErrorResponse)=>{
          const apiError = err.error as ErrorResponseDto;
          alert(apiError.Message);
        }
      })
  }
}
