import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductRequestDto } from '../../../DTO/ProductRequestDto';
import { ProductServices } from '../../../services/Product/product-services';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-product-component',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './edit-product-component.html',
  styleUrl: './edit-product-component.css',
})
export class EditProductComponent implements OnInit {
  productForm:FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]), 
    productType: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)])
  });
  id!:number;

  ngOnInit(): void {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.prodService.getProductById(this.id).subscribe({
        next:(response)=>{
          this.productForm.patchValue({
            productName:response.data?.productName,
            productType:response.data?.productType,
            description:response.data?.description
          })
        },error:(err:HttpErrorResponse)=>{
          const apiError = err.error as ErrorResponseDto;
          alert(apiError.Message);
        }
      })
  }

  constructor(private prodService:ProductServices, private router:Router, private activatedRoute:ActivatedRoute){}

  editProduct(){
    const request:ProductRequestDto = this.productForm.value;
    this.prodService.updateProduct(this.id, request).subscribe({
      next:(response)=>{
        alert(response.message);
        this.router.navigate(['/viewproducts']);
      }, error:(err:HttpErrorResponse)=>{
        const apiError = err.error as ErrorResponseDto;
        alert(apiError.Message);
      }
    });
  }

  get productName():FormControl{
    return this.productForm.get('productName') as FormControl;
  }

  get productType():FormControl{
    return this.productForm.get('productType') as FormControl;
  }

  get description():FormControl{
    return this.productForm.get('description') as FormControl;
  }

}
