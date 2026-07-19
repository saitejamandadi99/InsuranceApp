import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PolicyPlanServices } from '../../../services/PolicyPlan/policy-plan-services';
import { Router } from '@angular/router';
import { PolicyPlanRequestDto } from '../../../DTO/PolicyPlanRequestDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { PremiumType } from '../../../models/PremiumType';
import { ProductResponseDto } from '../../../DTO/ProductResponseDto';
import { ProductServices } from '../../../services/Product/product-services';

@Component({
  selector: 'app-add-plan-component',
  imports: [ReactiveFormsModule, NgIf, PageHeader, LoadingSpinner],
  templateUrl: './add-plan-component.html',
  styleUrl: './add-plan-component.css',
})
export class AddPlanComponent implements OnInit {
  planForm:FormGroup=new FormGroup({
    productId:new FormControl('',[Validators.required]),
    planName:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    coverageAmount:new FormControl(1000, [Validators.required, Validators.min(1000)]),
    premiumAmount:new FormControl(1000,[Validators.required, Validators.min(1000)]),
    premiumType:new FormControl('', [Validators.required]),
    duration:new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)]),
    termsAndConditions:new FormControl('', [Validators.minLength(3), Validators.maxLength(300)])
  });
  constructor(private planService:PolicyPlanServices, private router:Router, private cdr:ChangeDetectorRef, private prodService: ProductServices ){}

  PremiumType=PremiumType;
  premiumTypes = Object.values(PremiumType);

  products:ProductResponseDto[] = [];


  isLoading=false;

  ngOnInit(): void {
      this.isLoading=true;
      this.prodService.listProducts(1,99, 'productName', 'asc', '').subscribe({
        next:(response)=>{
          this.products = response.data?.records ?? [];
          this.isLoading=false;
          console.log(this.products);
          this.cdr.detectChanges();
        },error:(err:HttpErrorResponse)=>{
          this.isLoading=false;
          const apiError = err.error as ErrorResponseDto;
          alert(apiError.Message);
        }
      })
  }


  addPlan(){
    this.isLoading=true;
    const request:PolicyPlanRequestDto= this.planForm.value;
    this.planService.addPolicyPlan(request).subscribe({
      next:(response)=>{
        alert(response.message);
        this.isLoading=false;
        this.router.navigate(['/viewplans']);
      },error:(err:HttpErrorResponse)=>{
        this.isLoading=false;
        const apiError = err.error as ErrorResponseDto;
        alert(apiError.Message);
      }
    })
  }

   get productId():FormControl{
    return this.planForm.get('productId') as FormControl;
  }

   get planName():FormControl{
    return this.planForm.get('planName') as FormControl;
  }

   get coverageAmount():FormControl{
    return this.planForm.get('coverageAmount') as FormControl;
  }

   get premiumAmount():FormControl{
    return this.planForm.get('premiumAmount') as FormControl;
  }

   get premiumType():FormControl{
    return this.planForm.get('premiumType') as FormControl;
  }

   get duration():FormControl{
    return this.planForm.get('duration') as FormControl;
  }

   get termsAndConditions():FormControl{
    return this.planForm.get('termsAndConditions') as FormControl;
  }

  navigateToPlans() {
  this.router.navigate(['/viewplans']);
}


}
