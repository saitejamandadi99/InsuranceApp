import { Component, OnInit } from '@angular/core';
import { PaginationResponseDto } from '../../../DTO/PaginationResponseDto';
import { ProductResponseDto } from '../../../DTO/ProductResponseDto';
import { ProductServices } from '../../../services/Product/product-services';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-view-products-component',
  imports: [ReactiveFormsModule, NgIf, NgFor],
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
  constructor(private prodService:ProductServices){}

  ngOnInit(): void {
      this.loadProducts();
  }
  loadProducts(){
    const filters = this.filterForm.value;
    this.prodService.listProducts(filters.pageNumber!, filters.pageSize!, filters.sortBy!, filters.sortDirection!, filters.search!).subscribe({
      next:(response)=>{

        this.lstProducts=response.data

      },error:(err:HttpErrorResponse)=>{
        const apiError = err.error as ErrorResponseDto
        alert(apiError.Message);
      }
    })
  }
}
