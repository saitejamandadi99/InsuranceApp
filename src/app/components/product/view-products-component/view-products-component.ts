import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaginationResponseDto } from '../../../DTO/PaginationResponseDto';
import { ProductResponseDto } from '../../../DTO/ProductResponseDto';
import { ProductServices } from '../../../services/Product/product-services';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { FilterCard } from '../../../shared/ui/filter-card/filter-card';
import { SearchBox } from '../../../shared/ui/search-box/search-box';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';
import { ActionButtons } from '../../../shared/ui/action-buttons/action-buttons';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { Role } from '../../../models/Role';
@Component({
  selector: 'app-view-products-component',
  imports: [ReactiveFormsModule, DatePipe, PageHeader, FilterCard, SearchBox, StatusBadge, ActionButtons, Pagination, LoadingSpinner, EmptyState],
  templateUrl: './view-products-component.html',
  styleUrl: './view-products-component.css',
})
export class ViewProductsComponent implements OnInit {

  filterForm:FormGroup= new FormGroup({
    search:new FormControl(''),
    sortBy:new FormControl('productName'),
    sortDirection:new FormControl('asc'),
    pageNumber:new FormControl(1),
    pageSize:new FormControl(10)
  });

  role:string = localStorage.getItem('role') ?? '';
  isAdmin:boolean = this.role === Role.Admin;

  searchProducts(){
    this.filterForm.patchValue({
      pageNumber:1,
    });
    this.loadProducts();
  }

  previousPage(){
    if(this.lstProducts &&  this.lstProducts.currentPage>1){
      this.filterForm.patchValue({
        pageNumber:this.lstProducts.currentPage-1
      });
      this.loadProducts();
    }
  }

  nextPage(){
    if(this.lstProducts &&  !this.lstProducts.isLastPage){
      this.filterForm.patchValue({
        pageNumber:this.lstProducts.currentPage+1
      });
      this.loadProducts();
    }
  }

  activateProduct(id:number){
    this.prodService.activateProduct(id).subscribe({
      next:(response)=>{
        alert(response.message)
        this.loadProducts();
      },error:(err:HttpErrorResponse)=>{
        const apiError= err.error as ErrorResponseDto;
        alert(apiError.Message)
      }
    })
  }

   deactivateProduct(id:number){
    this.prodService.deactivateProduct(id).subscribe({
      next:(response)=>{
        alert(response.message)
        this.loadProducts();
      },error:(err:HttpErrorResponse)=>{
        const apiError= err.error as ErrorResponseDto;
        alert(apiError.Message)
      }
    })
  }


  lstProducts!:PaginationResponseDto<ProductResponseDto>;
  isLoading=true;
  constructor(private prodService:ProductServices, private router:Router, private cdr:ChangeDetectorRef){}

  ngOnInit(): void {
      this.loadProducts();
  }
  loadProducts(){
    this.isLoading=true;
    const filters = this.filterForm.value;
    this.prodService.listProducts(filters.pageNumber!, filters.pageSize!, filters.sortBy!, filters.sortDirection!, filters.search!).subscribe({
      next:(response)=>{

        this.lstProducts=response.data
        this.isLoading=false;
        this.cdr.detectChanges();

      },error:(err:HttpErrorResponse)=>{
        this.isLoading=false;

        const apiError = err.error as ErrorResponseDto
        alert(apiError.Message);
      }
    })
  }
  resetFilters() {
  this.filterForm.reset({
    search: '',
    sortBy: 'productName',
    sortDirection: 'asc',
    pageNumber: 1,
    pageSize: 10
  });
  this.loadProducts();
}


clearSearch() {
  this.filterForm.patchValue({
    search: '',
    pageNumber: 1
  });
  this.loadProducts();
}

editProduct(id:number){
    this.router.navigate(['/editproduct', id])
}

  navigateToAddProduct(){
    this.router.navigate(['/addproduct']);
}

get searchControl(): FormControl {
  return this.filterForm.get('search') as FormControl;
}
}
