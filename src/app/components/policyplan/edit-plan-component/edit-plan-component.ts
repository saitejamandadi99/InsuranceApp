import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PolicyPlanServices } from '../../../services/PolicyPlan/policy-plan-services';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyPlanRequestDto } from '../../../DTO/PolicyPlanRequestDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';

@Component({
  selector: 'app-edit-plan-component',
  imports: [ReactiveFormsModule,NgIf, NgFor],
  templateUrl: './edit-plan-component.html',
  styleUrl: './edit-plan-component.css',
})
export class EditPlanComponent implements OnInit {
  planForm:FormGroup=new FormGroup({
    productId:new FormControl(''),
    planName:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    coverageAmount:new FormControl(1000, [Validators.required, Validators.min(1000)]),
    premiumAmount:new FormControl(1000,[Validators.required, Validators.min(1000)]),
    premiumType:new FormControl('', [Validators.required]),
    duration:new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)]),
    termsAndConditions:new FormControl('', [Validators.minLength(3), Validators.maxLength(300)])
  });

  id!:number;

  constructor(private planService:PolicyPlanServices, private router:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
      this.id=this.activatedRoute.snapshot.params['id'];
      this.planService.getPolicyPlanById(this.id).subscribe({
        next:(response)=>{
          this.planForm.patchValue({
            productId:response.data.productId,
            planName:response.data.planName,
            coverageAmount:response.data.coverageAmount,
            premiumAmount:response.data.premiumAmount,
            premiumType:response.data.premiumType,
            duration:response.data.duration,
            termsAndConditions:response.data.termsAndConditions
          })
        },error:(err:HttpErrorResponse)=>{
          const apiError = err.error as ErrorResponseDto;
          alert(apiError.Message);
        }
      })
  }

  editPlan(){
    const request:PolicyPlanRequestDto= this.planForm.value;
    this.planService.updatePolicyPlan(this.id, request).subscribe({
      next:(response)=>{
        alert(response.message);
        this.router.navigate(['/viewplans']);
      },error:(err:HttpErrorResponse)=>{
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


}

