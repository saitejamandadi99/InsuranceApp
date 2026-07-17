import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductType } from '../../../models/ProductType';
import { ProductServices } from '../../../services/Product/product-services';
import { Router } from '@angular/router';
import { ProductRequestDto } from '../../../DTO/ProductRequestDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-product-component',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-product-component.html',
  styleUrl: './add-product-component.css',
})
export class AddProductComponent {
  productForm:FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]), 
    productType: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)])
  });

  constructor(private prodService:ProductServices, private router:Router){}

  addProduct(){
    const request:ProductRequestDto = this.productForm.value;
    this.prodService.addProduct(request).subscribe({
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
